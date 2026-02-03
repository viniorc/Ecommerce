"use client";

import { usePathname } from "next/navigation";
import { TopBar } from "@/components/top-bar";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const topBarMessages = [
  "Frete fixo acessivel",
  "Envio rapido",
  "Atendimento no WhatsApp",
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar messages={topBarMessages} />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
