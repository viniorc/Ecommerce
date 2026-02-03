import type { Metadata } from "next";
import { Section } from "@/components/section";
import { BrandCard } from "@/components/brand-card";

export const metadata: Metadata = {
  title: "Termos | Liahna",
  description:
    "Termos e condicoes de uso para garantir uma experiencia tranquila.",
  openGraph: {
    title: "Termos | Liahna",
    description:
      "Termos e condicoes de uso para garantir uma experiencia tranquila.",
    type: "website",
    images: [{ url: "/brand/mood-collection.png" }],
  },
};

export default function TermosPage() {
  return (
    <main className="bg-background">
      <Section
        eyebrow="Termos"
        title="Termos e condicoes"
        description="Informacoes gerais sobre compras, uso e atendimento."
        className="pt-10 md:pt-14"
      >
        <BrandCard className="space-y-4 text-sm text-muted-foreground">
          <p>
            Ao comprar na Liahna, voce concorda com os termos descritos abaixo.
            Nosso objetivo e oferecer transparencia e clareza em todas as etapas.
          </p>
          <ul className="space-y-2">
            <li>Pedidos sao confirmados apos pagamento aprovado.</li>
            <li>Precos e disponibilidade podem ser atualizados sem aviso previo.</li>
            <li>Imagens sao ilustrativas e podem ter pequenas variacoes.</li>
            <li>Conteudo protegido por direitos autorais.</li>
          </ul>
        </BrandCard>
      </Section>
    </main>
  );
}
