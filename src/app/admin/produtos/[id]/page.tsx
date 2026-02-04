import { notFound } from "next/navigation";
import { getAdminProductById, parseArray } from "@/lib/products";
import { ProductFormShell } from "../_components/product-form-shell";

type Props = { params: Promise<{ id: string }> };

export default async function AdminEditarProdutoPage({ params }: Props) {
  const { id } = await params;
  const product = await getAdminProductById(id);
  if (!product) return notFound();

  const initialData = {
    name: product.name,
    slug: product.slug,
    category: product.category,
    description: product.description,
    details: parseArray(product.details),
    tags: parseArray(product.tags),
    materials: parseArray(product.materials),
    colors: parseArray(product.colors),
    price: product.price / 100,
    promoPrice: product.promoPrice ? product.promoPrice / 100 : undefined,
    inStock: product.inStock,
    stockQty: product.stockQty,
    active: product.active,
    featured: product.featured,
    images: product.images
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((image) => ({
        id: image.id,
        url: image.url,
        alt: image.alt ?? undefined,
        sortOrder: image.sortOrder,
      })),
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Produtos
        </p>
        <h1 className="font-display text-2xl uppercase text-foreground">
          Editar produto
        </h1>
      </div>
      <ProductFormShell productId={id} initialData={initialData} />
    </div>
  );
}
