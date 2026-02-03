import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pedido confirmado | Liahna",
  description: "Seu pedido foi confirmado com sucesso.",
  openGraph: {
    title: "Pedido confirmado | Liahna",
    description: "Seu pedido foi confirmado com sucesso.",
    type: "website",
    images: [{ url: "/brand/mood-collection.png" }],
  },
};

export default function PedidoSucessoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
