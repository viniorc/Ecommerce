"use client";

import dynamic from "next/dynamic";

type ProductFormProps = {
  productId?: string;
  initialData?: {
    name: string;
    slug: string;
    category: string;
    description: string;
    details: string[];
    tags: string[];
    materials: string[];
    colors: string[];
    price: number;
    promoPrice?: number;
    inStock: boolean;
    stockQty?: number | null;
    active: boolean;
    featured: boolean;
    images: Array<{
      id?: string;
      url: string;
      alt?: string;
      sortOrder?: number;
    }>;
  };
};

const ProductForm = dynamic(
  () => import("./product-form").then((mod) => mod.ProductForm),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-4">
        <div className="h-6 w-48 rounded-full bg-muted/40" />
        <div className="h-72 w-full rounded-[16px] bg-muted/30" />
      </div>
    ),
  }
);

export function ProductFormShell(props: ProductFormProps) {
  return <ProductForm {...props} />;
}
