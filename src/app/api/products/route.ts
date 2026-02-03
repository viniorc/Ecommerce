import { NextResponse } from "next/server";
import { filterProductList, getPublicProducts, sortProductList } from "@/lib/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  const q = searchParams.get("q") ?? undefined;
  const minRaw = searchParams.get("min");
  const maxRaw = searchParams.get("max");
  const minPrice = minRaw && !Number.isNaN(Number(minRaw)) ? Number(minRaw) : undefined;
  const maxPrice = maxRaw && !Number.isNaN(Number(maxRaw)) ? Number(maxRaw) : undefined;
  const inStock = searchParams.get("inStock");
  const tags =
    searchParams
      .get("tags")
      ?.split(",")
      .map((tag) => tag.trim())
      .filter(Boolean) ?? [];
  const sort = searchParams.get("sort") ?? "recommended";

  const products = await getPublicProducts();
  const filtered = filterProductList(products, {
    category,
    q,
    minPrice,
    maxPrice,
    tags,
  });
  const withStock =
    inStock === "true" || inStock === "1"
      ? filtered.filter((item) => item.inStock)
      : filtered;
  const sorted = sortProductList(withStock, sort);

  return NextResponse.json({ items: sorted });
}
