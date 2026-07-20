import { roundValue } from "@/shared/utils";

import { CleanDetailedFoodItem } from "./types";
import { EdamamDetailedFood } from "../api/edamam/schemas";

export function mapResponseToCleanFoodItemsDetail(
    food: EdamamDetailedFood,
): CleanDetailedFoodItem {
    const nutrients = food.nutrients ?? {};

    return {
        id: food.foodId || food.label,
        image: food.image || undefined,
        fat: roundValue(nutrients.FAT),
        brand: food.brand || undefined,
        fiber: roundValue(nutrients.FIBTG),
        title: food.label || "Unknown Food",
        carbs: roundValue(nutrients.CHOCDF),
        protein: roundValue(nutrients.PROCNT),
        calories: roundValue(nutrients.ENERC_KCAL),
        ingredients: food.foodContentsLabel || undefined,
        category: food.categoryLabel || food.category || "Other",
    };
}
