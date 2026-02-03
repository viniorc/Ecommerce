import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/section";
import { BrandCard } from "@/components/brand-card";

export const metadata: Metadata = {
  title: "Sobre | Liahna",
  description:
    "Conheca a historia da Liahna, sua curadoria clean e o cuidado em cada detalhe.",
  openGraph: {
    title: "Sobre | Liahna",
    description:
      "Conheca a historia da Liahna, sua curadoria clean e o cuidado em cada detalhe.",
    type: "website",
    images: [{ url: "/brand/mood-collection.png" }],
  },
};

export default function SobrePage() {
  return (
    <main className="bg-background">
      <Section
        eyebrow="Nossa historia"
        title="Sobre a Liahna"
        description="Uma boutique clean, elegante e acolhedora, com textura de areia e brilho champanhe."
        className="pt-10 md:pt-14"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="space-y-6 text-sm text-muted-foreground">
            <p>
              A Liahna nasce para transformar o cotidiano em pequenos rituais de
              cuidado. Cada peca carrega uma mistura de dourado champanhe, perolas
              e linhas minimalistas.
            </p>
            <p>
              Criamos colecoes pequenas, com foco em versatilidade e conforto.
              Nossas joias acompanham voce no trabalho, em encontros especiais e
              nos momentos mais simples.
            </p>
          </div>

          <BrandCard className="p-4">
            <Image
              src="/brand/mood-collection.png"
              alt="Moodboard Liahna"
              width={720}
              height={520}
              className="h-full w-full rounded-[14px] object-cover"
              priority
            />
          </BrandCard>
        </div>

        <div className="grid gap-4 pt-10 md:grid-cols-3">
          {[
            {
              title: "Curadoria",
              text: "Selecao enxuta para combinar entre si e manter o visual leve.",
            },
            {
              title: "Materiais",
              text: "Banho champanhe, perolas e acabamentos suaves ao toque.",
            },
            {
              title: "Atendimento",
              text: "Cuidado humano e respostas rapidas no WhatsApp.",
            },
          ].map((item) => (
            <BrandCard key={item.title} className="space-y-2">
              <h3 className="font-display text-lg uppercase text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </BrandCard>
          ))}
        </div>
      </Section>
    </main>
  );
}
