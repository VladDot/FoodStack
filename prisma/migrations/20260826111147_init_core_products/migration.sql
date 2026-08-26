/*
  Warnings:

  - You are about to drop the `favorites_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "favorites_products" DROP CONSTRAINT "favorites_products_product_id_fkey";

-- DropForeignKey
ALTER TABLE "favorites_products" DROP CONSTRAINT "favorites_products_user_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_user_id_fkey";

-- DropTable
DROP TABLE "favorites_products";

-- DropTable
DROP TABLE "products";

-- CreateTable
CREATE TABLE "core_products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "external_food_id" TEXT,
    "calories" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION NOT NULL,
    "fiber" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "core_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_info" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "external_food_id" TEXT,
    "calories" DOUBLE PRECISION NOT NULL,
    "total_weight" DOUBLE PRECISION NOT NULL,
    "diet_labels" JSONB,
    "health_labels" JSONB,
    "cautions" JSONB,
    "total_nutrients" JSONB NOT NULL,
    "total_daily" JSONB,
    "ingredients" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_products" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "core_products_external_food_id_key" ON "core_products"("external_food_id");

-- CreateIndex
CREATE INDEX "core_products_external_food_id_idx" ON "core_products"("external_food_id");

-- CreateIndex
CREATE INDEX "core_products_name_idx" ON "core_products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_info_external_food_id_key" ON "product_info"("external_food_id");

-- CreateIndex
CREATE INDEX "product_info_external_food_id_idx" ON "product_info"("external_food_id");

-- CreateIndex
CREATE UNIQUE INDEX "saved_products_user_id_product_id_key" ON "saved_products"("user_id", "product_id");

-- AddForeignKey
ALTER TABLE "core_products" ADD CONSTRAINT "core_products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_products" ADD CONSTRAINT "saved_products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_products" ADD CONSTRAINT "saved_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "core_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
