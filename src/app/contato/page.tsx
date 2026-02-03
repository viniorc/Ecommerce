import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { Section } from "@/components/section";
import { BrandCard } from "@/components/brand-card";
import { BrandButton } from "@/components/brand-button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Contato | Liahna",
  description:
    "Entre em contato com a Liahna para duvidas, pedidos especiais e suporte.",
  openGraph: {
    title: "Contato | Liahna",
    description:
      "Entre em contato com a Liahna para duvidas, pedidos especiais e suporte.",
    type: "website",
    images: [{ url: "/brand/mood-collection.png" }],
  },
};

export default function ContatoPage() {
  return (
    <main className="bg-background">
      <Section
        eyebrow="Atendimento"
        title="Contato"
        description="Fale com a gente para ajustar pedidos ou tirar duvidas."
        className="pt-10 md:pt-14"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <BrandCard className="space-y-5">
            <h2 className="font-display text-lg uppercase text-foreground">
              Envie sua mensagem
            </h2>
            <form className="space-y-4">
              <div className="space-y-1">
                <label
                  htmlFor="contact-name"
                  className="text-xs uppercase tracking-[0.14em] text-muted-foreground"
                >
                  Nome
                </label>
                <Input
                  id="contact-name"
                  name="name"
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="contact-email"
                  className="text-xs uppercase tracking-[0.14em] text-muted-foreground"
                >
                  Email
                </label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="voce@email.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="contact-message"
                  className="text-xs uppercase tracking-[0.14em] text-muted-foreground"
                >
                  Mensagem
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Como podemos ajudar?"
                  required
                  className="w-full rounded-[12px] border border-input bg-transparent px-3 py-2 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <BrandButton type="submit" className="w-full">
                Enviar mensagem
              </BrandButton>
            </form>
          </BrandCard>

          <div className="space-y-4">
            <BrandCard className="space-y-3">
              <h3 className="font-display text-lg uppercase text-foreground">
                Atendimento humano
              </h3>
              <p className="text-sm text-muted-foreground">
                Respostas rapidas durante horario comercial e suporte dedicado
                para pedidos especiais.
              </p>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link
                  href="https://wa.me/5551999999999"
                  className="inline-flex items-center gap-2 text-foreground transition hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4 text-gold" />
                  WhatsApp (placeholder)
                </Link>
                <span className="inline-flex items-center gap-2 text-foreground">
                  <Phone className="h-4 w-4 text-gold" />
                  (11) 00000-0000
                </span>
              </div>
            </BrandCard>

            <BrandCard className="p-4">
              <Image
                src="/brand/mood-collection.png"
                alt="Atmosfera Liahna"
                width={520}
                height={420}
                className="h-full w-full rounded-[14px] object-cover"
              />
            </BrandCard>
          </div>
        </div>
      </Section>
    </main>
  );
}
