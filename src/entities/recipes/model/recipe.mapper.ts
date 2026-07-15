import { roundValue } from "@/shared/utils";
import { SpoonacularRecipe } from "@/shared/api/spoonacular";

import { CleanRecipeItem } from "./types";

export function mapResponseToCleanRecipeItems(
    recipes: SpoonacularRecipe[],
): CleanRecipeItem[] {
    if (!recipes || recipes.length === 0) return [];

    return recipes.map((recipe) => {
        const nutrients = recipe.nutrition?.nutrients || [];

        const findNutrient = (name: string): number => {
            const amount = nutrients.find(
                (n) => n.name.toLowerCase() === name.toLowerCase(),
            )?.amount;

            return amount ?? 0;
        };

        return {
            id: String(recipe.id),
            image: recipe.image || "",
            fat: roundValue(findNutrient("Fat")),
            title: recipe.title || "Unknown Recipe",
            servings: roundValue(recipe.servings) || 1,
            protein: roundValue(findNutrient("Protein")),
            calories: roundValue(findNutrient("Calories")),
            carbs: roundValue(findNutrient("Carbohydrates")),
            ingredients:
                recipe.extendedIngredients?.map((ing) => ing.original) || [],
        };
    });
}
