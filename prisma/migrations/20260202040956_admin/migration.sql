-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "details" TEXT,
    "price" INTEGER NOT NULL,
    "promoPrice" INTEGER,
    "category" TEXT NOT NULL,
    "tags" TEXT,
    "materials" TEXT,
    "colors" TEXT,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "stockQty" INTEGER,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("active", "category", "colors", "createdAt", "description", "details", "featured", "id", "inStock", "materials", "name", "price", "promoPrice", "slug", "stockQty", "tags", "updatedAt") SELECT "active", "category", "colors", "createdAt", "description", "details", "featured", "id", "inStock", "materials", "name", "price", "promoPrice", "slug", "stockQty", "tags", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
