import { roundValue } from "@/shared/utils";
import { SpoonacularRecipe } from "@/entities/recipes/api/spoonacular";

import { CleanRecipeItem } from "./types";
import { pickNutrient } from "./pickNutrient";

export function mapResponseToCleanRecipeItems(
    recipes: SpoonacularRecipe[],
): CleanRecipeItem[] {
    if (!recipes || recipes.length === 0) return [];

    return recipes.map((recipe) => {
        const nutrients = recipe.nutrition?.nutrients || [];

        return {
            id: String(recipe.id),
            image: recipe.image || "",
            fat: pickNutrient(nutrients, "Fat"),
            title: recipe.title || "Unknown Recipe",
            servings: roundValue(recipe.servings) || 1,
            protein: pickNutrient(nutrients, "Protein"),
            calories: pickNutrient(nutrients, "Calories"),
            carbs: pickNutrient(nutrients, "Carbohydrates"),
            ingredients:
                recipe.extendedIngredients?.map((ing) => ing.original) || [],
        };
    });
}
