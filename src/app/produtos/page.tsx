import { categories } from "@/data/categories";
import { getPublicProducts, filterProductList, sortProductList } from "@/lib/products";
import { ProductsClient } from "./products-client";

export const dynamic = "force-dynamic";

type SearchParams = {
  category?: string;
  categoria?: string;
  q?: string;
  min?: string;
  max?: string;
  sort?: string;
  tags?: string;
  inStock?: string;
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function ProdutosPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const categoryParam = params.category ?? params.categoria;
  const category = categoryParam
    ? categories.find((c) => c.slug === categoryParam)?.slug
    : undefined;
  const q = params.q?.trim() ?? "";
  const minPrice = params.min ? Number(params.min) : undefined;
  const maxPrice = params.max ? Number(params.max) : undefined;
  const sort = params.sort ?? "recommended";
  const selectedTags = params.tags
    ? params.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];
  const inStockOnly = params.inStock === "true" || params.inStock === "1";

  const products = await getPublicProducts();
  const filtered = filterProductList(products, {
    category,
    q,
    minPrice,
    maxPrice,
    tags: selectedTags,
  });
  const withStock = inStockOnly ? filtered.filter((item) => item.inStock) : filtered;
  const sorted = sortProductList(withStock, sort);
  const highestPrice = products.length
    ? Math.max(...products.map((item) => item.price))
    : 100;

  return (
    <ProductsClient
      items={sorted}
      category={category}
      q={q}
      minPrice={minPrice}
      maxPrice={maxPrice}
      sort={sort}
      selectedTags={selectedTags}
      inStockOnly={inStockOnly}
      highestPrice={highestPrice}
    />
  );
}
