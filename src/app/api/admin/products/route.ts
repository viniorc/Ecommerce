import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { parseArray, stringifyArray, toCents, fromCents } from "@/lib/products";

type ImagePayload = {
  url: string;
  alt?: string;
  sortOrder?: number;
};

const PAGE_SIZE = 10;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(Number(searchParams.get("page") ?? "1"), 1);
  const q = searchParams.get("q")?.trim();
  const category = searchParams.get("category")?.trim();
  const active = searchParams.get("active");
  const featured = searchParams.get("featured");

  const where: Prisma.ProductWhereInput = {};
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { slug: { contains: q, mode: "insensitive" } },
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
    images: item.images.sort((a, b) => a.sortOrder - b.sortOrder),
  }));

  return NextResponse.json({
    items: payload,
    total,
    page,
    pageSize: PAGE_SIZE,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const details = Array.isArray(body.details) ? body.details : [];
  const tags = Array.isArray(body.tags) ? body.tags : [];
  const materials = Array.isArray(body.materials) ? body.materials : [];
  const colors = Array.isArray(body.colors) ? body.colors : [];
  const images: ImagePayload[] = Array.isArray(body.images) ? body.images : [];

  const price = toCents(Number(body.price ?? 0));
  const promoPrice =
    body.promoPrice !== undefined && body.promoPrice !== null && body.promoPrice !== ""
      ? toCents(Number(body.promoPrice))
      : null;

  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug: body.slug,
      description: body.description ?? "",
      details: stringifyArray(details),
      price,
      promoPrice,
      category: body.category,
      tags: stringifyArray(tags),
      materials: stringifyArray(materials),
      colors: stringifyArray(colors),
      inStock: Boolean(body.inStock),
      stockQty:
        body.stockQty !== undefined && body.stockQty !== null && body.stockQty !== ""
          ? Number(body.stockQty)
          : null,
      featured: Boolean(body.featured),
      active: body.active !== false,
      images: {
        create: images.map((img, index) => ({
          url: img.url,
          alt: img.alt ?? body.name,
          sortOrder: img.sortOrder ?? index,
        })),
      },
    },
    include: { images: true },
  });

  revalidatePath("/produtos");

  return NextResponse.json({ id: product.id });
}
