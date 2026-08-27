/*
  Warnings:

  - The values [OPEN_FOOD_FACTS] on the enum `ProductSource` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProductSource_new" AS ENUM ('USDA', 'USER');
ALTER TABLE "public"."core_products" ALTER COLUMN "source" DROP DEFAULT;
ALTER TABLE "core_products" ALTER COLUMN "source" TYPE "ProductSource_new" USING ("source"::text::"ProductSource_new");
ALTER TYPE "ProductSource" RENAME TO "ProductSource_old";
ALTER TYPE "ProductSource_new" RENAME TO "ProductSource";
DROP TYPE "public"."ProductSource_old";
ALTER TABLE "core_products" ALTER COLUMN "source" SET DEFAULT 'USDA';
COMMIT;

-- DropIndex
DROP INDEX "core_products_source_external_food_id_key";

-- AlterTable
ALTER TABLE "core_products" ALTER COLUMN "source" SET DEFAULT 'USDA';
