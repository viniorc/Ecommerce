import type { Metadata } from "next";
import Image from "next/image";
import { BrandButton } from "@/components/brand-button";
import { BrandCard } from "@/components/brand-card";
import { PriceTag } from "@/components/price-tag";
import { Section } from "@/components/section";

const featuredPieces = [
  {
    name: "Anel Aurora",
    description: "Banho champanhe com detalhes em madrepérola.",
    price: 420,
    originalPrice: 520,
    tag: "Nova coleção",
  },
  {
    name: "Brinco Brisa",
    description: "Design leve, acabamento polido e brilho suave.",
    price: 280,
    originalPrice: 0,
    tag: "Clássico",
  },
  {
    name: "Colar Horizonte",
    description: "Corrente delicada com pingente geométrico minimalista.",
    price: 360,
    originalPrice: 410,
    tag: "Favorito",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Section
        eyebrow="Liahna Studio"
        title="Jóias e acessórios para iluminar o cotidiano"
        description="Uma boutique clean, elegante e acolhedora, com peças em tons champanhe, pérola e areia."
        className="pt-10 md:pt-14"
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <BrandButton>Ver produtos</BrandButton>
              <BrandButton variant="outline">Coleções</BrandButton>
            </div>
            <p className="text-base text-muted-foreground md:text-lg">
              Frete para todo o Brasil, peças hipoalergênicas e embaladas com
              carinho. Crie um ritual diário com brilho suave e textura de
              areia.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="rounded-full bg-pearl px-3 py-1">
                Banho champanhe
              </span>
              <span className="rounded-full bg-pearl px-3 py-1">
                Pérola e madrepérola
              </span>
              <span className="rounded-full bg-pearl px-3 py-1">
                Garantia de 1 ano
              </span>
            </div>
          </div>
          <BrandCard className="relative overflow-hidden bg-surface">
            <div className="absolute inset-0 bg-gradient-to-br from-pearl via-transparent to-[rgba(203,162,99,0.1)]" />
            <div className="relative grid min-h-[320px] grid-cols-2 gap-4">
              <div className="flex items-center justify-center">
                <Image
                  src="/brand/placeholder.svg"
                  alt="Moodboard Liahna"
                  width={360}
                  height={320}
                  className="h-full w-full rounded-[14px] object-cover shadow-card"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center gap-4 rounded-[14px] bg-card/70 p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Materiais
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Ouro champanhe com proteção antialérgica</li>
                  <li>• Pérolas naturais e madrepérola</li>
                  <li>• Texturas inspiradas em areia suave</li>
                </ul>
                <div className="flex gap-3">
                  <BrandButton size="sm">Agendar styling</BrandButton>
                  <BrandButton size="sm" variant="outline">
                    Ver novidades
                  </BrandButton>
                </div>
              </div>
            </div>
          </BrandCard>
        </div>
      </Section>

      <Section
        title="Seleção em destaque"
        description="Curadoria com respiro, sombras suaves e acabamentos artesanais."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPieces.map((piece) => (
            <BrandCard key={piece.name} className="space-y-4">
              <div className="relative h-44 overflow-hidden rounded-2xl bg-gradient-to-br from-pearl via-card to-surface">
                <div className="absolute inset-0 bg-sand-texture opacity-80" />
                <div className="relative flex h-full items-center justify-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {piece.tag}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl uppercase text-foreground">
                    {piece.name}
                  </h3>
                  <span className="rounded-full bg-pearl px-2 py-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    Liahna
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {piece.description}
                </p>
                <PriceTag
                  price={piece.price}
                  originalPrice={piece.originalPrice || undefined}
                />
              </div>
              <div className="flex items-center justify-between">
                <BrandButton size="sm">Adicionar</BrandButton>
                <BrandButton size="sm" variant="outline">
                  Detalhes
                </BrandButton>
              </div>
            </BrandCard>
          ))}
        </div>
      </Section>
    </main>
  );
}
export const metadata: Metadata = {
  title: "Liahna Joias e Acessorios",
  description:
    "Boutique clean e acolhedora com joias em tons champanhe, perola e areia.",
  openGraph: {
    title: "Liahna Joias e Acessorios",
    description:
      "Boutique clean e acolhedora com joias em tons champanhe, perola e areia.",
    type: "website",
    images: [{ url: "/brand/mood-collection.png" }],
  },
};
