/*
  Warnings:

  - A unique constraint covering the columns `[source,external_food_id]` on the table `core_products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ProductSource" AS ENUM ('USDA', 'OPEN_FOOD_FACTS', 'USER');

-- AlterTable
ALTER TABLE "core_products" ADD COLUMN     "defaultUnit" TEXT NOT NULL DEFAULT 'g',
ADD COLUMN     "source" "ProductSource" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "core_products_source_external_food_id_key" ON "core_products"("source", "external_food_id");
