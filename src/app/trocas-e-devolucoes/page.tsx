import type { Metadata } from "next";
import { Section } from "@/components/section";
import { BrandCard } from "@/components/brand-card";

export const metadata: Metadata = {
  title: "Trocas e Devolucoes | Liahna",
  description:
    "Entenda o processo de trocas e devolucoes da Liahna, com prazos claros e atendimento acolhedor.",
  openGraph: {
    title: "Trocas e Devolucoes | Liahna",
    description:
      "Entenda o processo de trocas e devolucoes da Liahna, com prazos claros e atendimento acolhedor.",
    type: "website",
    images: [{ url: "/brand/mood-collection.png" }],
  },
};

export default function TrocasPage() {
  return (
    <main className="bg-background">
      <Section
        eyebrow="Ajuda"
        title="Trocas e devolucoes"
        description="Queremos que voce fique feliz com a escolha. Veja como funciona."
        className="pt-10 md:pt-14"
      >
        <div className="grid gap-6 md:grid-cols-3">
          <BrandCard className="space-y-3">
            <h3 className="font-display text-lg uppercase text-foreground">
              Prazo
            </h3>
            <p className="text-sm text-muted-foreground">
              Trocas em ate 7 dias corridos apos o recebimento, conforme o CDC.
            </p>
          </BrandCard>
          <BrandCard className="space-y-3">
            <h3 className="font-display text-lg uppercase text-foreground">
              Como solicitar
            </h3>
            <p className="text-sm text-muted-foreground">
              Envie uma mensagem com o numero do pedido e o motivo da troca.
            </p>
          </BrandCard>
          <BrandCard className="space-y-3">
            <h3 className="font-display text-lg uppercase text-foreground">
              Condicoes
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Produto sem sinais de uso.</li>
              <li>Embalagem original preservada.</li>
              <li>Itens promocionais podem ter regras especificas.</li>
            </ul>
          </BrandCard>
        </div>

        <BrandCard className="mt-8 space-y-3">
          <h3 className="font-display text-lg uppercase text-foreground">
            Precisa de ajuda?
          </h3>
          <p className="text-sm text-muted-foreground">
            Nosso atendimento esta pronto para orientar todo o processo pelo
            WhatsApp.
          </p>
        </BrandCard>
      </Section>
    </main>
  );
}
