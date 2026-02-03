"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { MobileMenu } from "@/components/mobile-menu";
import { useCartStore } from "@/store/cart";

const navLinks = [
  { label: "Novidades", href: "/produtos?sort=newest" },
  { label: "Brincos", href: "/produtos?category=brincos" },
  { label: "Colares", href: "/produtos?category=colares" },
  { label: "Pulseiras", href: "/produtos?category=pulseiras" },
  { label: "Aneis", href: "/produtos?category=aneis" },
  { label: "Lencos", href: "/produtos?category=lencos" },
  { label: "Kits", href: "/produtos?category=kits" },
  { label: "Promocoes", href: "/produtos?category=promocoes" },
];

const extraLinks = [
  { label: "Trocas", href: "/trocas-e-devolucoes" },
  { label: "Contato", href: "/contato" },
];

export function SiteHeader() {
  const searchParams = useSearchParams();
  const cartCount = useCartStore((state) => state.itemCount());
  const [logoError, setLogoError] = useState(false);
  const currentQuery = searchParams.get("q") ?? "";

  const allNavLinks = useMemo(() => navLinks, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-[76px] items-center gap-4">
        <div className="flex flex-1 items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            {!logoError ? (
              <Image
                src="/brand/logo.png"
                alt="Liahna Joias e Acessorios"
                width={148}
                height={36}
                priority
                onError={() => setLogoError(true)}
                className="h-9 w-auto"
              />
            ) : (
              <span className="font-display text-xl uppercase tracking-[0.18em] text-foreground">
                Liahna
              </span>
            )}
            <span className="sr-only">Ir para a pagina inicial</span>
          </Link>

          <nav className="hidden flex-1 items-center gap-2 lg:flex">
            {allNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[12px] px-3 py-2 text-sm font-medium text-foreground transition hover:bg-pearl/80 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <form className="relative w-64" action="/produtos" method="get">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              name="q"
              defaultValue={currentQuery}
              placeholder="Buscar pecas..."
              aria-label="Buscar produtos"
              className="h-10 rounded-[12px] bg-card pl-10"
            />
          </form>
          <Link
            href="/carrinho"
            aria-label="Ir para o carrinho"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-[12px] border border-border/80 bg-card text-foreground transition hover:border-gold hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                {cartCount}
              </span>
            ) : null}
          </Link>
        </div>

        <MobileMenu
          navLinks={allNavLinks}
          extraLinks={extraLinks}
          cartCount={cartCount}
          currentQuery={currentQuery}
        />
      </div>
    </header>
  );
}
