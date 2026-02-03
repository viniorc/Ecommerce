"use client";

import { useMemo, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckCircle2, PackageCheck, Phone, Shield } from "lucide-react";
import { Product, fallbackProductImage, formatBRL } from "@/data/products";
import { BrandButton } from "@/components/brand-button";
import { PriceTag } from "@/components/price-tag";
import { BrandCard } from "@/components/brand-card";
import { ProductCard } from "@/components/product-card";
import { useCartStore } from "@/store/cart";
import { Section } from "@/components/section";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
  related: Product[];
};

export function ProductDetails({ product, related }: Props) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [selectedImage, setSelectedImage] = useState(
    product.images.find(Boolean) ?? fallbackProductImage
  );
  const [isPending, startTransition] = useTransition();
  const [cepInput, setCepInput] = useState("");
  const [shippingMessage, setShippingMessage] = useState<string | null>(null);
  const [shippingError, setShippingError] = useState<string | null>(null);

  const finalPrice = product.promoPrice ?? product.price;

  const shippingOptions = useMemo(
    () => [
      { label: "PAC", price: formatBRL(21.9), eta: "6-9 dias úteis" },
      { label: "SEDEX", price: formatBRL(29.5), eta: "2-4 dias úteis" },
    ],
    []
  );

  const handleAdd = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        promoPrice: product.promoPrice,
        image: selectedImage,
        slug: product.slug,
      },
      1
    );
  };

  const handleBuyNow = () => {
    handleAdd();
    startTransition(() => router.push("/checkout"));
  };

  const handleSimulate = () => {
    const digits = cepInput.replace(/\D/g, "");
    if (digits.length !== 8) {
      setShippingError("Digite um CEP válido com 8 números.");
      setShippingMessage(null);
      return;
    }
    setShippingError(null);
    setShippingMessage(
      `Estimativa: ${shippingOptions[0].label} ${shippingOptions[0].eta} (${shippingOptions[0].price}) ou ${shippingOptions[1].label} ${shippingOptions[1].eta} (${shippingOptions[1].price}).`
    );
  };

  const infoList = [
    { icon: PackageCheck, label: "Embalagem presenteável" },
    { icon: Shield, label: "Troca fácil" },
    { icon: Phone, label: "Atendimento WhatsApp" },
  ];

  const tags = product.tags.slice(0, 4);

  return (
    <main className="bg-background">
      <Section className="pt-10 md:pt-14" title={product.name} description={product.description}>
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[16px] border border-border/70 bg-card/80 shadow-card">
              <Image
                src={selectedImage}
                alt={product.name}
                width={900}
                height={900}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="flex flex-wrap gap-3">
              {(product.images.length ? product.images : [fallbackProductImage]).map((img) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={cn(
                    "h-20 w-20 overflow-hidden rounded-[12px] border border-border/70 bg-card/80",
                    selectedImage === img && "border-gold ring-2 ring-gold"
                  )}
                  aria-label={`Visualizar ${product.name}`}
                >
                  <Image
                    src={img || fallbackProductImage}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-pearl px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <PriceTag price={finalPrice} originalPrice={product.promoPrice ? product.price : undefined} />

            <p className="text-base text-muted-foreground">{product.description}</p>

            <div className="space-y-3">
              <h3 className="font-display text-lg uppercase text-foreground">
                Detalhes
              </h3>
              <div className="overflow-hidden rounded-[14px] border border-border/70 bg-card/70">
                <details open className="group border-b border-border/60 p-4 last:border-none">
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
                    Especificações
                    <span className="text-muted-foreground transition group-open:rotate-90">›</span>
                  </summary>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {product.details.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
                <details className="group border-b border-border/60 p-4 last:border-none">
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
                    Materiais e cores
                    <span className="text-muted-foreground transition group-open:rotate-90">›</span>
                  </summary>
                  <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
                    {product.materials.map((material) => (
                      <span key={material} className="rounded-full bg-pearl px-3 py-1">
                        {material}
                      </span>
                    ))}
                    {product.colors.map((color) => (
                      <span key={color} className="rounded-full bg-card px-3 py-1">
                        {color}
                      </span>
                    ))}
                  </div>
                </details>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <BrandButton
                variant="primary"
                className="w-full sm:w-auto"
                onClick={handleAdd}
                disabled={isPending}
              >
                Adicionar ao carrinho
              </BrandButton>
              <BrandButton
                variant="outline"
                className="w-full sm:w-auto"
                onClick={handleBuyNow}
                disabled={isPending}
              >
                Comprar agora
              </BrandButton>
            </div>

            <div className="grid gap-3 rounded-[16px] border border-border/70 bg-card/70 p-4 sm:grid-cols-3">
              {infoList.map((info) => (
                <div key={info.label} className="flex items-center gap-3 text-sm text-foreground">
                  <info.icon className="h-5 w-5 text-gold" />
                  <span>{info.label}</span>
                </div>
              ))}
            </div>

            <BrandCard className="space-y-4 bg-card/90">
              <h3 className="font-display text-lg uppercase text-foreground px-4 pt-4">
                Simule o frete
              </h3>
              <div className="flex flex-col gap-3 px-4 pb-4 sm:flex-row">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Seu CEP"
                  aria-label="Digite seu CEP"
                  value={cepInput}
                  onChange={(e) => setCepInput(e.target.value)}
                  className="h-11 flex-1 rounded-[12px] border border-border/80 bg-background px-4 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
                />
                <BrandButton onClick={handleSimulate} className="sm:w-48">
                  Calcular
                </BrandButton>
              </div>
              {shippingError ? (
                <p className="px-4 pb-4 text-sm text-red-600">{shippingError}</p>
              ) : shippingMessage ? (
                <p className="px-4 pb-4 text-sm text-muted-foreground">{shippingMessage}</p>
              ) : null}
            </BrandCard>
          </div>
        </div>
      </Section>

      <Section
        title="Você também pode gostar"
        description="Peças que combinam com o clima acolhedor e o brilho champanhe."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} onAddToCart={handleAdd} />
          ))}
        </div>
      </Section>
    </main>
  );
}
