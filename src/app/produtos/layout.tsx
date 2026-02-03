import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos | Liahna",
  description: "Explore joias e acessorios com brilho champanhe e textura suave.",
  openGraph: {
    title: "Produtos | Liahna",
    description:
      "Explore joias e acessorios com brilho champanhe e textura suave.",
    type: "website",
    images: [{ url: "/brand/mood-collection.png" }],
  },
};

export default function ProdutosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
