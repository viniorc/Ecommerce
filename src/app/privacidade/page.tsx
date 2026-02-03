import type { Metadata } from "next";
import { Section } from "@/components/section";
import { BrandCard } from "@/components/brand-card";

export const metadata: Metadata = {
  title: "Privacidade | Liahna",
  description:
    "Saiba como a Liahna coleta, usa e protege seus dados com transparencia.",
  openGraph: {
    title: "Privacidade | Liahna",
    description:
      "Saiba como a Liahna coleta, usa e protege seus dados com transparencia.",
    type: "website",
    images: [{ url: "/brand/mood-collection.png" }],
  },
};

export default function PrivacidadePage() {
  return (
    <main className="bg-background">
      <Section
        eyebrow="Politica"
        title="Privacidade"
        description="Transparencia e cuidado com seus dados."
        className="pt-10 md:pt-14"
      >
        <BrandCard className="space-y-4 text-sm text-muted-foreground">
          <p>
            Usamos seus dados apenas para processar pedidos, melhorar sua
            experiencia e oferecer suporte. Nao compartilhamos informacoes
            sensiveis com terceiros sem consentimento.
          </p>
          <p>
            Voce pode solicitar atualizacao ou exclusao dos dados a qualquer
            momento. Basta nos enviar uma mensagem pelos canais oficiais.
          </p>
          <ul className="space-y-2">
            <li>Dados coletados: nome, email, telefone e endereco.</li>
            <li>Uso principal: entrega, suporte e comunicacao.</li>
            <li>Armazenamento seguro e acesso limitado.</li>
          </ul>
        </BrandCard>
      </Section>
    </main>
  );
}
