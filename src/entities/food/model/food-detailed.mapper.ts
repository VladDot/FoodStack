import { roundValue } from "@/shared/utils";

import { CleanFoodDetailItem } from "./types";
import { EdamamDetailedFood } from "../api/edamam/schemas";

export function mapResponseToCleanFoodDetail(
    data: EdamamDetailedFood,
): CleanFoodDetailItem {
    const parsed = data.ingredients?.[0]?.parsed?.[0];
    const nutrients = data.totalNutrients ?? {};

    return {
        image: undefined,
        brand: undefined,
        category: "Other",
        ingredients: undefined,
        id: parsed?.foodId || "",
        dietLabels: data.dietLabels,
        totalDaily: data.totalDaily,
        totalWeight: data.totalWeight,
        healthLabels: data.healthLabels,
        totalNutrients: data.totalNutrients,
        title: parsed?.food || "Unknown Food",
        fat: roundValue(nutrients.FAT?.quantity ?? 0),
        fiber: roundValue(nutrients.FIBTG?.quantity ?? 0),
        carbs: roundValue(nutrients.CHOCDF?.quantity ?? 0),
        protein: roundValue(nutrients.PROCNT?.quantity ?? 0),
        calories: roundValue(nutrients.ENERC_KCAL?.quantity ?? 0),
    };
}
