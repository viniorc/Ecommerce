import type { Metadata } from "next";
import { Suspense } from "react";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { Providers } from "./providers";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Liahna Joias e Acessorios",
  description:
    "Boutique clean e acolhedora de joias e acessorios assinada por Liahna.",
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${cinzel.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <Providers>
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <AppShell>{children}</AppShell>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
