import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrinho | Liahna",
  description: "Revise suas pecas e finalize o pedido com calma.",
  openGraph: {
    title: "Carrinho | Liahna",
    description: "Revise suas pecas e finalize o pedido com calma.",
    type: "website",
    images: [{ url: "/brand/mood-collection.png" }],
  },
};

export default function CarrinhoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
