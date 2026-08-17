-- AlterTable
ALTER TABLE "products" ALTER COLUMN "external_food_id" DROP NOT NULL,
ALTER COLUMN "diet_labels" DROP NOT NULL,
ALTER COLUMN "diet_labels" DROP DEFAULT,
ALTER COLUMN "health_labels" DROP NOT NULL,
ALTER COLUMN "health_labels" DROP DEFAULT,
ALTER COLUMN "cautions" DROP NOT NULL,
ALTER COLUMN "cautions" DROP DEFAULT,
ALTER COLUMN "total_daily" DROP NOT NULL,
ALTER COLUMN "total_daily" DROP DEFAULT,
ALTER COLUMN "ingredients" DROP NOT NULL,
ALTER COLUMN "ingredients" DROP DEFAULT;

-- CreateTable
CREATE TABLE "favorites_products" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "favorites_products_user_id_product_id_key" ON "favorites_products"("user_id", "product_id");

-- CreateIndex
CREATE INDEX "products_external_food_id_idx" ON "products"("external_food_id");

-- AddForeignKey
ALTER TABLE "favorites_products" ADD CONSTRAINT "favorites_products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites_products" ADD CONSTRAINT "favorites_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
