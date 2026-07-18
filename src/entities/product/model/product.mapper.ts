import { roundValue } from "@/shared/utils";
import { EdamamHint } from "@/shared/api/edamam/foods";

import { CleanFoodItem } from "./types";

export function mapResponseToCleanFoodItems(
    hints: EdamamHint[],
): CleanFoodItem[] {
    if (!hints || hints.length === 0) return [];

    return hints.map((hint) => {
        const food = hint?.food;
        const nutrients = food.nutrients ?? {};

        return {
            id: food.foodId || food.label,
            image: food.image || undefined,
            fat: roundValue(nutrients.FAT),
            title: food.label || "Unknown Food",
            carbs: roundValue(nutrients.CHOCDF),
            protein: roundValue(nutrients.PROCNT),
            calories: roundValue(nutrients.ENERC_KCAL),
        };
    });
}
