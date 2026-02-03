import Image from "next/image";
import Link from "next/link";
import { Tag } from "lucide-react";
import { BrandCard } from "@/components/brand-card";
import { BrandButton } from "@/components/brand-button";
import { PriceTag } from "@/components/price-tag";
import { cn } from "@/lib/utils";
import { type Product, fallbackProductImage, formatBRL } from "@/data/products";

type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
  pending?: boolean;
};

export function ProductCard({ product, onAddToCart, pending }: ProductCardProps) {
  const cover = product.images.find(Boolean) ?? fallbackProductImage;
  const effectivePrice = product.promoPrice ?? product.price;

  return (
    <BrandCard
      className={cn("flex h-full flex-col gap-4 p-4", pending && "animate-pulse")}
      subtleHover
    >
      <div className="relative overflow-hidden rounded-[14px] bg-pearl/80">
        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-card/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>
        {!product.inStock ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/35 text-sm font-semibold uppercase tracking-[0.22em] text-pearl">
            Esgotado
          </div>
        ) : null}
        <Image
          src={cover}
          alt={product.name}
          width={520}
          height={600}
          className="h-64 w-full rounded-[14px] object-cover"
          priority={product.featured}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div className="space-y-1">
          <Link
            href={`/produto/${product.slug}`}
            className="font-display text-xl uppercase text-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {product.name}
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>

        <PriceTag
          price={effectivePrice}
          originalPrice={product.promoPrice ? product.price : undefined}
        />

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="rounded-full bg-pearl px-3 py-1">
            {formatBRL(effectivePrice)}
          </span>
          {product.materials.slice(0, 2).map((material) => (
            <span key={material} className="rounded-full bg-card px-3 py-1">
              {material}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-3">
          <BrandButton
            variant="outline"
            size="sm"
            className="w-full"
            disabled={!product.inStock || pending}
            onClick={() => onAddToCart?.(product)}
          >
            Adicionar ao carrinho
          </BrandButton>
          <BrandButton asChild size="sm" className="w-full">
            <Link href={`/produto/${product.slug}`}>Ver detalhes</Link>
          </BrandButton>
        </div>
      </div>
    </BrandCard>
  );
}

export function ProductCardSkeleton() {
  return (
    <BrandCard className="flex h-full flex-col gap-4 p-4" subtleHover>
      <div className="h-64 w-full rounded-[14px] bg-muted/30" />
      <div className="space-y-3">
        <div className="h-5 w-2/3 rounded-full bg-muted/30" />
        <div className="h-4 w-full rounded-full bg-muted/30" />
        <div className="h-4 w-5/6 rounded-full bg-muted/30" />
        <div className="h-6 w-32 rounded-full bg-muted/30" />
        <div className="flex gap-3">
          <div className="h-10 w-full rounded-[12px] bg-muted/30" />
          <div className="h-10 w-full rounded-[12px] bg-muted/30" />
        </div>
      </div>
    </BrandCard>
  );
}
