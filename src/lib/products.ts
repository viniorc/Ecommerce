import { prisma } from "@/lib/prisma";
import {
  type Product as LocalProduct,
  products as localProducts,
  fallbackProductImage,
} from "@/data/products";
import { categories } from "@/data/categories";

type DbProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  details: string | null;
  price: number;
  promoPrice: number | null;
  category: string;
  tags: string | null;
  materials: string | null;
  colors: string | null;
  inStock: boolean;
  stockQty: number | null;
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  images: Array<{
    id: string;
    url: string;
    alt: string | null;
    sortOrder: number;
  }>;
};

export const toCents = (value: number) => Math.round(value * 100);
export const fromCents = (value: number | null) =>
  typeof value === "number" ? value / 100 : undefined;

export const parseArray = (value?: string | null) => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.filter(Boolean);
  } catch {
    // ignore
  }
  return value
    .split(/[,\\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
};

export const stringifyArray = (items?: string[]) => {
  if (!items || items.length === 0) return null;
  return JSON.stringify(items);
};

export const mapDbToPublicProduct = (product: DbProduct): LocalProduct => {
  const images = product.images
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((img) => img.url);
  const category =
    categories.find((item) => item.slug === product.category)?.slug ??
    categories[0]?.slug ??
    "brincos";

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price / 100,
    promoPrice: product.promoPrice ? product.promoPrice / 100 : undefined,
    category,
    tags: parseArray(product.tags),
    materials: parseArray(product.materials),
    colors: parseArray(product.colors),
    images: images.length ? images : [fallbackProductImage],
    description: product.description,
    details: parseArray(product.details),
    inStock: product.inStock,
    featured: product.featured,
    createdAt: product.createdAt.toISOString(),
  };
};

export const filterProductList = (
  list: LocalProduct[],
  options: {
    category?: string;
    q?: string;
    minPrice?: number;
    maxPrice?: number;
    tags?: string[];
  }
) => {
  const query = options.q?.trim().toLowerCase();
  const tagSet = options.tags?.map((tag) => tag.toLowerCase());

  return list.filter((product) => {
    if (options.category && product.category !== options.category) return false;

    const price = product.promoPrice ?? product.price;
    if (typeof options.minPrice === "number" && price < options.minPrice) return false;
    if (typeof options.maxPrice === "number" && price > options.maxPrice) return false;

    if (tagSet?.length) {
      const productTags = product.tags.map((tag) => tag.toLowerCase());
      if (!tagSet.every((tag) => productTags.includes(tag))) return false;
    }

    if (query) {
      const haystack = [
        product.name,
        product.description,
        product.tags.join(" "),
        product.materials.join(" "),
        product.colors.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    return true;
  });
};

export const sortProductList = (list: LocalProduct[], sort?: string) => {
  const items = [...list];
  const sortKey = sort ?? "recommended";

  return items.sort((a, b) => {
    const priceA = a.promoPrice ?? a.price;
    const priceB = b.promoPrice ?? b.price;
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    switch (sortKey) {
      case "price-asc":
        return priceA - priceB;
      case "price-desc":
        return priceB - priceA;
      case "newest":
        return dateB - dateA;
      default:
        if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
        return dateB - dateA;
    }
  });
};

export const getPublicProducts = async () => {
  const dbProducts = await prisma.product.findMany({
    where: { active: true },
    include: { images: true },
  });

  if (!dbProducts.length) return localProducts;
  return dbProducts.map((product) => mapDbToPublicProduct(product as DbProduct));
};

export const getPublicProductBySlug = async (slug: string) => {
  const product = await prisma.product.findFirst({
    where: { slug, active: true },
    include: { images: true },
  });

  if (product) return mapDbToPublicProduct(product as DbProduct);
  return localProducts.find((item) => item.slug === slug) ?? null;
};

export const getAdminProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
    include: { images: true },
  });
};
