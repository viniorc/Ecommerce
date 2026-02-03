import Link from "next/link";
import { BrandButton } from "@/components/brand-button";
import { Input } from "@/components/ui/input";

export function SiteFooter() {
  const helpLinks = [
    { label: "Trocas e devolucoes", href: "/trocas-e-devolucoes" },
    { label: "Termos e condicoes", href: "/termos" },
    { label: "Politica de privacidade", href: "/privacidade" },
  ];

  return (
    <footer className="border-t border-border/70 bg-surface/60 text-foreground">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <h3 className="font-display text-xl uppercase">Sobre a Liahna</h3>
          <p className="text-sm text-muted-foreground">
            Pecas com textura suave, banho champanhe e um toque acolhedor.
            Criamos joias para iluminar o cotidiano com conforto e elegancia
            sem exageros.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-display text-xl uppercase">Ajuda</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {helpLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-[10px] px-1 py-1 transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-display text-xl uppercase">Contato</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="https://wa.me/5551999999999"
                className="rounded-[10px] px-1 py-1 transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                WhatsApp (placeholder)
              </Link>
            </li>
            <li>
              <Link
                href="https://instagram.com/liahna"
                className="rounded-[10px] px-1 py-1 transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Instagram (placeholder)
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-display text-xl uppercase">Receba novidades</h3>
          <p className="text-sm text-muted-foreground">
            Inspiracoes semanais, lancamentos e beneficios exclusivos para a
            comunidade Liahna.
          </p>
          <form className="space-y-3">
            <Input
              type="email"
              name="email"
              placeholder="Seu email"
              aria-label="Cadastrar email"
              className="h-11 rounded-[12px] bg-card"
            />
            <BrandButton type="submit" className="w-full">
              Quero receber
            </BrandButton>
          </form>
        </div>
      </div>
      <div className="border-t border-border/60 bg-card/70 py-4">
        <div className="container flex flex-col items-start justify-between gap-3 text-sm text-muted-foreground md:flex-row">
          <span>
            © {new Date().getFullYear()} Liahna. Todos os direitos reservados.
          </span>
          <span>Feito com cuidado e brilho suave.</span>
        </div>
      </div>
    </footer>
  );
}
