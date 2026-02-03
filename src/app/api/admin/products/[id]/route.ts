import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { parseArray, stringifyArray, toCents, fromCents } from "@/lib/products";

type ImagePayload = {
  url: string;
  alt?: string;
  sortOrder?: number;
};

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    details: parseArray(product.details),
    price: fromCents(product.price),
    promoPrice: fromCents(product.promoPrice),
    category: product.category,
    tags: parseArray(product.tags),
    materials: parseArray(product.materials),
    colors: parseArray(product.colors),
    inStock: product.inStock,
    stockQty: product.stockQty,
    featured: product.featured,
    active: product.active,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    images: product.images.sort((a, b) => a.sortOrder - b.sortOrder),
  });
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const images: ImagePayload[] = Array.isArray(body.images) ? body.images : [];
  const imagesOnly = Boolean(body.imagesOnly);
  const slugFromBody =
    typeof body.slug === "string" && body.slug.trim() ? body.slug.trim() : null;

  if (!imagesOnly) {
    const details = Array.isArray(body.details) ? body.details : [];
    const tags = Array.isArray(body.tags) ? body.tags : [];
    const materials = Array.isArray(body.materials) ? body.materials : [];
    const colors = Array.isArray(body.colors) ? body.colors : [];

    const price = toCents(Number(body.price ?? 0));
    const promoPrice =
      body.promoPrice !== undefined && body.promoPrice !== null && body.promoPrice !== ""
        ? toCents(Number(body.promoPrice))
        : null;

    await prisma.product.update({
      where: { id },
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
      },
    });
  }

  await prisma.productImage.deleteMany({ where: { productId: id } });
  if (images.length) {
    await prisma.productImage.createMany({
      data: images.map((img, index) => ({
        productId: id,
        url: img.url,
        alt: img.alt ?? body.name ?? "Produto",
        sortOrder: img.sortOrder ?? index,
      })),
    });
  }

  const slug =
    slugFromBody ??
    (await prisma.product.findUnique({
      where: { id },
      select: { slug: true },
    }))?.slug ??
    null;

  revalidatePath("/produtos");
  if (slug) {
    revalidatePath(`/produto/${slug}`);
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
