import type { CleanProduct } from "@/entities/product";

import type { OFFProduct } from "./types";

export function mapProduct(offProd: OFFProduct): CleanProduct {
    return {
        id: offProd.code,
        name: offProd.product_name || "Невідомий продукт",
        brand: offProd.brands || "Власний бренд",
        calories: Math.round(offProd.nutriments?.["energy-kcal_100g"] || 0),
        protein: Number((offProd.nutriments?.proteins_100g || 0).toFixed(1)),
        fat: Number((offProd.nutriments?.fat_100g || 0).toFixed(1)),
        carbs: Number((offProd.nutriments?.carbohydrates_100g || 0).toFixed(1)),
        imageUrl: offProd.image_front_url || "",
    };
}
