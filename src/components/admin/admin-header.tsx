"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/produtos", label: "Produtos" },
];

export function AdminHeader() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin/login")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/admin"
            className="font-display text-lg uppercase tracking-[0.2em] text-foreground"
          >
            Liahna Admin
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[10px] px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-pearl/80 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="rounded-[10px] px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            Ver loja
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="inline-flex items-center gap-2 rounded-[10px] border border-border/70 px-3 py-2 text-sm text-muted-foreground transition hover:border-gold hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
