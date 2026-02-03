"use client";

import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Search, Trash2, Copy } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatBRL, fallbackProductImage } from "@/data/products";
import { BrandButton } from "@/components/brand-button";
import { BrandCard } from "@/components/brand-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { categories } from "@/data/categories";

type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price?: number;
  promoPrice?: number;
  inStock: boolean;
  stockQty: number | null;
  active: boolean;
  featured: boolean;
  images: Array<{ url: string; alt?: string }>;
};

type AdminProductsClientProps = {
  items: AdminProduct[];
  total: number;
  page: number;
  pageSize: number;
  query: string;
  category: string;
  active: string;
  featured: string;
};

export function AdminProductsClient({
  items,
  total,
  page,
  pageSize,
  query,
  category,
  active,
  featured,
}: AdminProductsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const canPrev = page > 1;
  const canNext = page * pageSize < total;

  const updateParams = (update: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    update(params);
    startTransition(() => {
      const queryString = params.toString();
      router.replace(queryString ? `?${queryString}` : "?", { scroll: false });
    });
  };

  const handleSearch = (value: string) => {
    updateParams((params) => {
      if (value) params.set("q", value);
      else params.delete("q");
      params.set("page", "1");
    });
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    router.refresh();
  };

  const handleDuplicate = async (id: string) => {
    const response = await fetch(`/api/admin/products/${id}`);
    if (!response.ok) return;
    const data = await response.json();
    const suffix = data.id ? data.id.slice(0, 6) : "copia";
    const newSlug = `${data.slug}-copia-${suffix}`;

    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        slug: newSlug,
        name: `${data.name} (Copia)`,
      }),
    });

    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Admin
          </p>
          <h1 className="font-display text-2xl uppercase text-foreground">
            Produtos
          </h1>
        </div>
        <BrandButton asChild>
          <Link href="/admin/produtos/novo">
            <span className="inline-flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Novo produto
            </span>
          </Link>
        </BrandButton>
      </div>

      <BrandCard className="space-y-4 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              key={query}
              defaultValue={query}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch(e.currentTarget.value);
                }
              }}
              onBlur={(e) => handleSearch(e.currentTarget.value)}
              placeholder="Buscar por nome ou slug"
              className="h-10 pl-10"
            />
          </div>
          <Select
            value={category}
            onValueChange={(value) =>
              updateParams((params) => {
                if (value === "all") params.delete("category");
                else params.set("category", value);
                params.set("page", "1");
              })
            }
          >
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.slug} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={active}
            onValueChange={(value) =>
              updateParams((params) => {
                if (value === "all") params.delete("active");
                else params.set("active", value);
                params.set("page", "1");
              })
            }
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Ativo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="true">Ativos</SelectItem>
              <SelectItem value="false">Inativos</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={featured}
            onValueChange={(value) =>
              updateParams((params) => {
                if (value === "all") params.delete("featured");
                else params.set("featured", value);
                params.set("page", "1");
              })
            }
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Destaque" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="true">Destaques</SelectItem>
              <SelectItem value="false">Sem destaque</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isPending ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="h-10 w-full animate-pulse rounded-[12px] bg-muted/30" />
            ))}
          </div>
        ) : items.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preco</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Acoes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-[10px] border border-border/70 bg-pearl/80">
                        <Image
                          src={item.images?.[0]?.url ?? fallbackProductImage}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/admin/produtos/${item.id}`}
                          className="text-sm font-semibold text-foreground hover:text-primary"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">{item.slug}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <span className="text-sm text-foreground">
                      {formatBRL(item.promoPrice ?? item.price ?? 0)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {item.inStock ? (
                      <Badge variant="secondary">
                        {item.stockQty ?? "Disponivel"}
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Esgotado</Badge>
                    )}
                  </TableCell>
                  <TableCell className="space-x-2">
                    {item.active ? (
                      <Badge className="bg-emerald-100 text-emerald-700">
                        Ativo
                      </Badge>
                    ) : (
                      <Badge variant="outline">Inativo</Badge>
                    )}
                    {item.featured ? (
                      <Badge className="bg-gold/20 text-foreground">Destaque</Badge>
                    ) : null}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-2">
                      <BrandButton asChild variant="outline" size="sm">
                        <Link href={`/admin/produtos/${item.id}`}>Editar</Link>
                      </BrandButton>
                      <BrandButton
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleDuplicate(item.id)}
                      >
                        <Copy className="h-4 w-4" />
                      </BrandButton>
                      <Dialog>
                        <DialogTrigger asChild>
                          <BrandButton variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </BrandButton>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Excluir produto</DialogTitle>
                            <DialogDescription>
                              Tem certeza que deseja excluir &quot;{item.name}&quot;?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <BrandButton variant="outline">Cancelar</BrandButton>
                            </DialogClose>
                            <BrandButton onClick={() => handleDelete(item.id)}>
                              Excluir
                            </BrandButton>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="rounded-[16px] border border-dashed border-border/70 bg-card/70 p-10 text-center text-muted-foreground">
            <p className="font-display text-lg uppercase text-foreground">
              Nenhum produto encontrado
            </p>
            <p className="mt-2 text-sm">
              Ajuste filtros ou adicione um novo produto.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Total: {total} produto{total === 1 ? "" : "s"}
          </span>
          <div className="flex items-center gap-2">
            <BrandButton
              variant="outline"
              size="sm"
              disabled={!canPrev}
              onClick={() =>
                updateParams((params) => {
                  params.set("page", String(Math.max(page - 1, 1)));
                })
              }
            >
              Anterior
            </BrandButton>
            <BrandButton
              variant="outline"
              size="sm"
              disabled={!canNext}
              onClick={() =>
                updateParams((params) => {
                  params.set("page", String(page + 1));
                })
              }
            >
              Proxima
            </BrandButton>
          </div>
        </div>
      </BrandCard>
    </div>
  );
}
