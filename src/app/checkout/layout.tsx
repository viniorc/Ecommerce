import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Liahna",
  description: "Finalize seu pedido em tres etapas com seguranca e cuidado.",
  openGraph: {
    title: "Checkout | Liahna",
    description: "Finalize seu pedido em tres etapas com seguranca e cuidado.",
    type: "website",
    images: [{ url: "/brand/mood-collection.png" }],
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
