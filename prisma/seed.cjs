const { PrismaClient } = require("@prisma/client");
const { products: localProducts } = require("../src/data/products");

const prisma = new PrismaClient();

const toCents = (value) => Math.round(value * 100);
const stringifyArray = (items) =>
  items && items.length ? JSON.stringify(items) : null;

async function main() {
  const count = await prisma.product.count();
  if (count > 0) {
    console.log("Seed skipped: products already exist.");
    return;
  }

  const sample = localProducts.slice(0, 5);

  for (const product of sample) {
    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        details: stringifyArray(product.details),
        price: toCents(product.price),
        promoPrice: product.promoPrice ? toCents(product.promoPrice) : null,
        category: product.category,
        tags: stringifyArray(product.tags),
        materials: stringifyArray(product.materials),
        colors: stringifyArray(product.colors),
        inStock: product.inStock,
        stockQty: product.inStock ? 10 : 0,
        featured: product.featured,
        active: true,
        images: {
          create: product.images.map((url, index) => ({
            url,
            alt: product.name,
            sortOrder: index,
          })),
        },
      },
    });
  }

  console.log("Seed completed with 5 products.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
