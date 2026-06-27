-- AlterTable
ALTER TABLE "daily_logs" ALTER COLUMN "date" SET DATA TYPE DATE;

-- CreateIndex
CREATE INDEX "recipes_external_food_id_idx" ON "recipes"("external_food_id");
