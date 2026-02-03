import { NextResponse } from "next/server";
import { getPublicProductBySlug } from "@/lib/products";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const product = await getPublicProductBySlug(params.slug);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}
