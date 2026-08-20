/*
  Warnings:

  - You are about to drop the column `analyzed_instructions` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `extended_ingredients` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `health_score` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `nutrition` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `price_per_serving` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `source_name` on the `recipes` table. All the data in the column will be lost.
  - Added the required column `ingredients` to the `recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `steps` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "analyzed_instructions",
DROP COLUMN "extended_ingredients",
DROP COLUMN "health_score",
DROP COLUMN "nutrition",
DROP COLUMN "price_per_serving",
DROP COLUMN "source_name",
ADD COLUMN     "calories" DOUBLE PRECISION,
ADD COLUMN     "carbs" DOUBLE PRECISION,
ADD COLUMN     "fat" DOUBLE PRECISION,
ADD COLUMN     "ingredients" JSONB NOT NULL,
ADD COLUMN     "protein" DOUBLE PRECISION,
ADD COLUMN     "steps" JSONB NOT NULL;
