"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import { BrandButton } from "@/components/brand-button";
import { BrandCard } from "@/components/brand-card";
import { Section } from "@/components/section";
import { useCartStore } from "@/store/cart";
import { fallbackProductImage, formatBRL } from "@/data/products";

const FREE_SHIPPING_THRESHOLD = 180;

export default function CarrinhoPage() {
  const items = useCartStore((state) => state.items);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);
  const totals = useCartStore((state) => state.totals);
  const totalsValue = totals();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const couponDiscount = useMemo(() => {
    if (appliedCoupon === "LIAHNA10") {
      return totalsValue.total * 0.1;
    }
    return 0;
  }, [appliedCoupon, totalsValue.total]);

  const finalTotal = Math.max(totalsValue.total - couponDiscount, 0);
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - finalTotal, 0);
  const shippingProgress = Math.min(
    100,
    (finalTotal / FREE_SHIPPING_THRESHOLD) * 100
  );

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "LIAHNA10") {
      setAppliedCoupon("LIAHNA10");
    } else {
      setAppliedCoupon(null);
    }
  };

  return (
    <main className="bg-background">
      <Section
        eyebrow="Checkout"
        title="Carrinho"
        description="Revise suas peças e continue para o checkout."
        className="pt-10 md:pt-14"
      >
        {items.length === 0 ? (
          <div className="rounded-[16px] border border-dashed border-border/70 bg-card/70 p-10 text-center text-muted-foreground">
            <p className="font-display text-xl uppercase text-foreground">
              Seu carrinho está vazio
            </p>
            <p className="mt-2 text-sm">
              Adicione peças com textura de areia, pérolas e brilho champanhe.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <BrandButton asChild variant="primary">
                <Link href="/produtos">Ver produtos</Link>
              </BrandButton>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <BrandCard
                  key={item.id}
                  subtleHover
                  className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-4 sm:w-2/5">
                    <div className="h-24 w-24 overflow-hidden rounded-[14px] border border-border/70 bg-pearl/80">
                      <Image
                        src={item.image || fallbackProductImage}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <Link
                        href={item.slug ? `/produto/${item.slug}` : "/produtos"}
                        className="font-display text-lg uppercase text-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        {item.name}
                      </Link>
                      {item.variant ? (
                        <p className="text-sm text-muted-foreground">{item.variant}</p>
                      ) : null}
                      <p className="text-sm text-muted-foreground">
                        {formatBRL(item.price)} {item.originalPrice && item.originalPrice > item.price ? "(promo)" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <div className="inline-flex items-center gap-3 rounded-[12px] border border-border/70 bg-card/80 px-3 py-2">
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] bg-pearl/80 text-foreground transition hover:bg-pearl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        aria-label={`Diminuir quantidade de ${item.name}`}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-[36px] text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] bg-pearl/80 text-foreground transition hover:bg-pearl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        aria-label={`Aumentar quantidade de ${item.name}`}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-sm font-semibold text-foreground">
                      {formatBRL(item.price * item.quantity)}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <Trash className="h-4 w-4" />
                      Remover
                    </button>
                  </div>
                </BrandCard>
              ))}
            </div>

            <div className="space-y-4">
              <BrandCard className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display text-xl uppercase text-foreground">
                    Resumo
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Texturas de areia, pérola e banho champanhe para iluminar o cotidiano.
                  </p>
                </div>

                <div className="space-y-3 text-sm text-foreground">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>{formatBRL(totalsValue.subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-gold">
                    <span>Descontos</span>
                    <span>- {formatBRL(totalsValue.discount + couponDiscount)}</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatBRL(finalTotal)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-[12px] border border-dashed border-border/60 bg-pearl/80 p-4">
                    {remainingForFreeShipping > 0 ? (
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          Faltam {formatBRL(remainingForFreeShipping)} para frete grátis.
                        </p>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-card">
                          <div
                            className="h-full rounded-full bg-gold transition-all"
                            style={{ width: `${shippingProgress}%` }}
                            aria-label="Progresso para frete grátis"
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-foreground">
                        🎁 Frete grátis ativado para este pedido.
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="text"
                      placeholder="Cupom"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="h-11 flex-1 rounded-[12px] border border-border/80 bg-background px-3 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <BrandButton
                      variant="outline"
                      className="sm:w-40"
                      onClick={handleApplyCoupon}
                    >
                      Aplicar
                    </BrandButton>
                  </div>
                  {appliedCoupon === "LIAHNA10" ? (
                    <p className="text-sm text-muted-foreground">
                      Cupom <span className="font-semibold">LIAHNA10</span> aplicado (10% off).
                    </p>
                  ) : couponCode ? (
                    <p className="text-sm text-muted-foreground">
                      Use <span className="font-semibold">LIAHNA10</span> para testar o cupom.
                    </p>
                  ) : null}
                </div>

                <BrandButton asChild className="w-full">
                  <Link href="/checkout">Finalizar compra</Link>
                </BrandButton>
                <button
                  type="button"
                  onClick={clear}
                  className="text-sm text-muted-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Limpar carrinho
                </button>
              </BrandCard>
            </div>
          </div>
        )}
      </Section>
    </main>
  );
}
