import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fallbackProductImage } from "@/data/products";
import { getPublicProductBySlug, getPublicProducts } from "@/lib/products";
import { stripHtml } from "@/lib/utils";
import { ProductDetails } from "./product-details";

export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);

  if (!product) {
    return {
      title: "Produto | Liahna",
      description: "Detalhes da peca selecionada.",
      openGraph: {
        title: "Produto | Liahna",
        description: "Detalhes da peca selecionada.",
        type: "website",
        images: [{ url: fallbackProductImage }],
      },
    };
  }

  return {
    title: `${product.name} | Liahna`,
    description: stripHtml(product.description ?? ""),
    openGraph: {
      title: `${product.name} | Liahna`,
      description: stripHtml(product.description ?? ""),
      type: "website",
      images: [
        {
          url: product.images[0] || fallbackProductImage,
        },
      ],
    },
  };
}

export default async function ProdutoPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);
  if (!product) return notFound();

  const relatedBase = await getPublicProducts();
  const related = relatedBase
    .filter(
      (item) =>
        item.id !== product.id &&
        (item.category === product.category ||
          item.tags.some((tag) => product.tags.includes(tag)))
    )
    .slice(0, 4);

  return <ProductDetails product={product} related={related} />;
}
