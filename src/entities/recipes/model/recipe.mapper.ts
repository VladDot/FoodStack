import { roundValue } from "@/shared/utils";
import { EdamamRecipeHint } from "@/shared/api/edamam/recipes";

import { CleanRecipeItem } from "./types";

export function mapResponseToCleanRecipeItems(
    hints: EdamamRecipeHint[],
): CleanRecipeItem[] {
    if (!hints || hints.length === 0) return [];

    return hints.map((hint) => {
        const recipe = hint?.recipe;
        const nutrients = recipe?.totalNutrients || {};

        const recipeId = recipe?.uri?.split("_recipe_")[1] || "fallback-id";

        return {
            id: recipeId,
            image: recipe?.image || "",
            calories: roundValue(recipe?.calories),
            title: recipe?.label || "Unknown Recipe",
            servings: roundValue(recipe?.yield) || 1,
            fat: roundValue(nutrients.FAT?.quantity),
            ingredients: recipe?.ingredientLines || [],
            carbs: roundValue(nutrients.CHOCDF?.quantity),
            protein: roundValue(nutrients.PROCNT?.quantity),
        };
    });
}
