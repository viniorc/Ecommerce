"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { BrandButton } from "@/components/brand-button";
import { BrandCard } from "@/components/brand-card";
import { Section } from "@/components/section";
import { formatBRL } from "@/data/products";

type Order = {
  id: string;
  totals: { subtotal: number; discount: number; total: number };
};

export default function PedidoSucessoPage() {
  const searchParams = useSearchParams();
  const orderId = useMemo(() => {
    const idFromQuery = searchParams.get("orderId");
    if (idFromQuery) return idFromQuery;
    if (typeof window === "undefined") return null;
    return localStorage.getItem("liahna-last-order-id");
  }, [searchParams]);

  const order = useMemo(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("liahna-order");
    if (!stored) return null;
    try {
      return JSON.parse(stored) as Order;
    } catch {
      return null;
    }
  }, []);

  return (
    <main className="bg-background">
      <Section
        eyebrow="Pedido confirmado"
        title="Obrigada por escolher a Liahna"
        description="Seu pedido foi registrado com sucesso."
        className="pt-10 md:pt-14"
      >
        <BrandCard className="space-y-6 p-8">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-gold" />
            <div>
              <p className="text-sm text-muted-foreground">Número do pedido</p>
              <p className="font-display text-2xl uppercase text-foreground">
                {orderId ?? "LIA-XXXXXX"}
              </p>
            </div>
          </div>

          {order ? (
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Total pago</span>
                <span className="font-semibold text-foreground">
                  {formatBRL(order.totals.total)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Descontos</span>
                <span>- {formatBRL(order.totals.discount)}</span>
              </div>
            </div>
          ) : null}

          <p className="text-sm text-muted-foreground">
            Em breve, enviaremos a confirmação e o rastreio. Nosso atendimento está
            disponível para qualquer ajuste no pedido.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <BrandButton asChild className="w-full sm:w-auto">
              <Link href="/">Voltar para a loja</Link>
            </BrandButton>
            <BrandButton asChild variant="outline" className="w-full sm:w-auto">
              <Link href="https://wa.me/558597640250">
                <span className="inline-flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Falar no WhatsApp
                </span>
              </Link>
            </BrandButton>
          </div>
        </BrandCard>
      </Section>
    </main>
  );
}
