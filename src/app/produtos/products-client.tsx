"use client";

import { useMemo, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, RotateCcw, Sparkles } from "lucide-react";
import { categories, type CategorySlug } from "@/data/categories";
import { type Product, formatBRL } from "@/data/products";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import { BrandButton } from "@/components/brand-button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

const TAGS = ["Novo", "Mais vendido", "Presenteavel", "Minimal", "Perola", "Brilho"];
const SORT_OPTIONS = [
  { value: "recommended", label: "Recomendados" },
  { value: "price-asc", label: "Menor preco" },
  { value: "price-desc", label: "Maior preco" },
  { value: "newest", label: "Novidades" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

type ProductsClientProps = {
  items: Product[];
  category?: CategorySlug;
  q: string;
  minPrice?: number;
  maxPrice?: number;
  sort: string;
  selectedTags: string[];
  inStockOnly: boolean;
  highestPrice: number;
};

export function ProductsClient({
  items,
  category,
  q,
  minPrice,
  maxPrice,
  sort,
  selectedTags,
  inStockOnly,
  highestPrice,
}: ProductsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const addItem = useCartStore((state) => state.addItem);

  const updateParams = (update: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    update(params);
    if (params.has("categoria")) params.delete("categoria");
    const query = params.toString();
    startTransition(() => {
      router.replace(query ? `?${query}` : "?", { scroll: false });
    });
  };

  const toggleTag = (tag: string) => {
    updateParams((params) => {
      const current = new Set(
        params
          .get("tags")
          ?.split(",")
          .filter(Boolean)
      );
      if (current.has(tag)) {
        current.delete(tag);
      } else {
        current.add(tag);
      }
      if (current.size) params.set("tags", Array.from(current).join(","));
      else params.delete("tags");
    });
  };

  const setCategory = (value?: CategorySlug) => {
    updateParams((params) => {
      if (value) params.set("category", value);
      else params.delete("category");
    });
  };

  const setPriceValue = (kind: "min" | "max", value: string) => {
    updateParams((params) => {
      const numeric = value.trim() ? Math.max(0, Number(value)) : null;
      if (kind === "min") {
        if (numeric !== null && !Number.isNaN(numeric))
          params.set("min", numeric.toString());
        else params.delete("min");
      } else {
        if (numeric !== null && !Number.isNaN(numeric))
          params.set("max", numeric.toString());
        else params.delete("max");
      }
    });
  };

  const setInStock = (checked: boolean) => {
    updateParams((params) => {
      if (checked) params.set("inStock", "true");
      else params.delete("inStock");
    });
  };

  const setSort = (value: SortValue) => {
    updateParams((params) => {
      params.set("sort", value);
    });
  };

  const clearFilters = () => {
    startTransition(() => {
      router.replace("/produtos", { scroll: false });
    });
  };

  const handleAddToCart = (product: Product) => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        promoPrice: product.promoPrice,
        image: product.images[0],
        slug: product.slug,
      },
      1
    );
  };

  const formattedItems = useMemo(() => items, [items]);

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-12">
        <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Colecao
            </p>
            <h1 className="font-display text-3xl uppercase text-foreground md:text-4xl">
              Produtos
            </h1>
            <p className="text-sm text-muted-foreground">
              Explore pecas com textura de areia, perolas e banho champanhe. Filtros
              mantem sua selecao leve e focada.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-gold" />
            {formattedItems.length} peca{formattedItems.length === 1 ? "" : "s"} encontradas
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
          <aside className="space-y-6 rounded-[16px] border border-border/70 bg-card/80 p-5 backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <Filter className="h-4 w-4" />
                Filtros
              </div>
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Limpar
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Categoria
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setCategory(undefined)}
                  className={cn(
                    "rounded-[12px] border px-3 py-2 text-sm transition hover:border-gold hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    !category && "border-gold bg-pearl text-foreground"
                  )}
                >
                  Todas
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setCategory(cat.slug)}
                    className={cn(
                      "rounded-[12px] border px-3 py-2 text-sm transition hover:border-gold hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      category === cat.slug && "border-gold bg-pearl text-foreground"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Faixa de preco
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Minimo</label>
                  <Input
                    inputMode="decimal"
                    type="number"
                    min={0}
                    key={`min-${minPrice ?? "empty"}`}
                    defaultValue={minPrice ?? ""}
                    onBlur={(e) => setPriceValue("min", e.target.value)}
                    className="h-10 rounded-[12px] bg-card"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Maximo</label>
                  <Input
                    inputMode="decimal"
                    type="number"
                    min={0}
                    key={`max-${maxPrice ?? "empty"}`}
                    defaultValue={maxPrice ?? ""}
                    onBlur={(e) => setPriceValue("max", e.target.value)}
                    className="h-10 rounded-[12px] bg-card"
                    placeholder="100"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Intervalo atual: {formatBRL(minPrice ?? 0)} -{" "}
                {formatBRL(maxPrice ?? highestPrice)}
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {TAGS.map((tag) => {
                  const active = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        "rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition hover:border-gold hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        active && "border-gold bg-pearl text-foreground"
                      )}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Disponivel
              </p>
              <label className="inline-flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
                  aria-label="Somente produtos em estoque"
                />
                Apenas em estoque
              </label>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-[16px] border border-border/70 bg-card/70 px-4 py-3">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                {category ? (
                  <span className="rounded-full bg-pearl px-3 py-1">
                    Categoria: {categories.find((c) => c.slug === category)?.name}
                  </span>
                ) : (
                  <span className="rounded-full bg-pearl px-3 py-1">
                    Todas as categorias
                  </span>
                )}
                {q ? (
                  <span className="rounded-full bg-pearl px-3 py-1">
                    Busca: &quot;{q}&quot;
                  </span>
                ) : null}
                {selectedTags.length ? (
                  <span className="rounded-full bg-pearl px-3 py-1">
                    Tags: {selectedTags.join(", ")}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {SORT_OPTIONS.map((option) => (
                  <BrandButton
                    key={option.value}
                    variant={sort === option.value ? "primary" : "outline"}
                    size="sm"
                    className="min-w-[120px]"
                    onClick={() => setSort(option.value)}
                  >
                    {option.label}
                  </BrandButton>
                ))}
              </div>
            </div>

            {isPending ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <ProductCardSkeleton key={idx} />
                ))}
              </div>
            ) : formattedItems.length ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {formattedItems.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    pending={isPending}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[16px] border border-dashed border-border/70 bg-card/70 p-10 text-center text-muted-foreground">
                <p className="font-display text-xl uppercase text-foreground">
                  Nenhum item encontrado
                </p>
                <p className="mt-2 text-sm">
                  Ajuste filtros, remova tags ou explore outras categorias para
                  encontrar sua peca.
                </p>
                <div className="mt-6 flex justify-center">
                  <BrandButton variant="outline" onClick={clearFilters}>
                    Limpar filtros
                  </BrandButton>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
