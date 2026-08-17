-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "external_food_id" TEXT NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "total_weight" DOUBLE PRECISION NOT NULL,
    "diet_labels" JSONB NOT NULL DEFAULT '[]',
    "health_labels" JSONB NOT NULL DEFAULT '[]',
    "cautions" JSONB NOT NULL DEFAULT '[]',
    "total_nutrients" JSONB NOT NULL,
    "total_daily" JSONB NOT NULL DEFAULT '{}',
    "ingredients" JSONB NOT NULL DEFAULT '[]',
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_external_food_id_key" ON "products"("external_food_id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
