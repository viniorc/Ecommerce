import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { parseArray, fromCents } from "@/lib/products";
import { AdminProductsClient } from "./products-client";

type SearchParams = {
  page?: string;
  q?: string;
  category?: string;
  active?: string;
  featured?: string;
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const PAGE_SIZE = 10;

export default async function AdminProdutosPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(Number(params.page ?? "1"), 1);
  const q = params.q?.trim();
  const category = params.category?.trim();
  const active = params.active;
  const featured = params.featured;

  const where: Prisma.ProductWhereInput = {};
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { slug: { contains: q } },
    ];
  }
  if (category) where.category = category;
  if (active === "true") where.active = true;
  if (active === "false") where.active = false;
  if (featured === "true") where.featured = true;
  if (featured === "false") where.featured = false;

  const [total, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      include: { images: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  const payload = items.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    description: item.description,
    details: parseArray(item.details),
    price: fromCents(item.price),
    promoPrice: fromCents(item.promoPrice),
    category: item.category,
    tags: parseArray(item.tags),
    materials: parseArray(item.materials),
    colors: parseArray(item.colors),
    inStock: item.inStock,
    stockQty: item.stockQty,
    featured: item.featured,
    active: item.active,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    images: item.images
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((image) => ({
        url: image.url,
        alt: image.alt ?? undefined,
      })),
  }));

  return (
    <AdminProductsClient
      items={payload}
      total={total}
      page={page}
      pageSize={PAGE_SIZE}
      query={q ?? ""}
      category={category ?? "all"}
      active={active ?? "all"}
      featured={featured ?? "all"}
    />
  );
}
