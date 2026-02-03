"use client";

import Link from "next/link";
import { Menu, ShoppingBag, ChevronRight, Search } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

type NavLink = { label: string; href: string };

type MobileMenuProps = {
  navLinks: NavLink[];
  extraLinks: NavLink[];
  cartCount: number;
  currentQuery?: string;
};

export function MobileMenu({
  navLinks,
  extraLinks,
  cartCount,
  currentQuery = "",
}: MobileMenuProps) {
  return (
    <div className="flex items-center gap-3 lg:hidden">
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

      <Sheet>
        <SheetTrigger
          aria-label="Abrir menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] border border-border/80 bg-card text-foreground transition hover:border-gold hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[88%] max-w-sm border-border/80 bg-background/95 text-foreground backdrop-blur-xl"
        >
          <SheetHeader className="text-left">
            <SheetTitle className="font-display text-2xl uppercase text-foreground">
              Liahna
            </SheetTitle>
            <SheetDescription className="text-muted-foreground">
              Boutique acolhedora com texturas de areia e brilho champanhe.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            <form className="relative" action="/produtos" method="get">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                name="q"
                defaultValue={currentQuery}
                placeholder="Buscar peças..."
                aria-label="Buscar produtos"
                className="h-11 rounded-[12px] bg-card pl-10"
              />
            </form>

            <nav className="space-y-3">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Categorias
              </p>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between rounded-[12px] border border-transparent bg-card/60 px-4 py-3 text-base text-foreground transition hover:border-gold hover:bg-card/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <span className="font-medium">{link.label}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="space-y-3">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Ajuda
              </p>
              <ul className="space-y-2">
                {extraLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between rounded-[12px] border border-border/60 px-4 py-3 text-sm text-muted-foreground transition hover:border-gold hover:bg-card/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {link.label}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
