/*
  Warnings:

  - You are about to drop the column `calories_per_100` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `carbs_per_100` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `fat_per_100` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `protein_per_100` on the `recipes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[external_food_id]` on the table `recipes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `analyzed_instructions` to the `recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extended_ingredients` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "calories_per_100",
DROP COLUMN "carbs_per_100",
DROP COLUMN "fat_per_100",
DROP COLUMN "protein_per_100",
ADD COLUMN     "analyzed_instructions" JSONB NOT NULL,
ADD COLUMN     "diets" TEXT[],
ADD COLUMN     "dish_types" TEXT[],
ADD COLUMN     "extended_ingredients" JSONB NOT NULL,
ADD COLUMN     "health_score" DOUBLE PRECISION,
ADD COLUMN     "nutrition" JSONB,
ADD COLUMN     "price_per_serving" DOUBLE PRECISION,
ADD COLUMN     "ready_in_minutes" INTEGER,
ADD COLUMN     "servings" INTEGER,
ADD COLUMN     "source_name" TEXT,
ADD COLUMN     "source_url" TEXT,
ADD COLUMN     "summary" TEXT,
ALTER COLUMN "user_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "favorites_user_id_recipe_id_key" ON "favorites"("user_id", "recipe_id");

-- CreateIndex
CREATE UNIQUE INDEX "recipes_external_food_id_key" ON "recipes"("external_food_id");

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
