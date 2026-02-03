import { cn } from "@/lib/utils";

type PriceTagProps = {
  price: number;
  originalPrice?: number;
  currency?: string;
  className?: string;
};

const fallbackFormatter = (currency: string) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });

export function PriceTag({
  price,
  originalPrice,
  currency = "BRL",
  className,
}: PriceTagProps) {
  const formatter = fallbackFormatter(currency);
  const showPromo =
    typeof originalPrice === "number" && originalPrice > price && price >= 0;
  const discount = showPromo
    ? Math.round(((originalPrice! - price) / originalPrice!) * 100)
    : null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline gap-2 text-lg font-semibold text-foreground",
        className
      )}
    >
      <span className="text-primary">
        {formatter.format(Math.max(price, 0))}
      </span>
      {showPromo ? (
        <>
          <span className="text-sm font-normal text-muted-foreground line-through">
            {formatter.format(originalPrice!)}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/70 bg-pearl px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground">
            Promo {discount ? `-${discount}%` : null}
          </span>
        </>
      ) : null}
    </div>
  );
}
