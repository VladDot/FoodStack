import { roundValue } from "@/shared/utils";

import { pickNutrient } from "./pickNutrient";
import { CleanRecipeDetailItem } from "./types";
import { SpoonacularRecipeDetail } from "../api/spoonacular";

export function mapResponseToCleanRecipeDetail(
    recipe: SpoonacularRecipeDetail,
): CleanRecipeDetailItem {
    const nutrients = recipe.nutrition?.nutrients || [];

    const summary = (recipe.summary || "").replace(/<[^>]*>/g, "").trim();

    const steps =
        recipe.analyzedInstructions
            ?.filter((section) => section.steps.length > 0)
            .map((section) => ({
                name: section.name,
                steps: section.steps.map((step) => ({
                    text: step.step,
                    number: step.number,
                })),
            })) || [];

    return {
        steps,
        summary,
        id: String(recipe.id),
        diets: recipe.diets || [],
        imageUrl: recipe.image || "",
        dishTypes: recipe.dishTypes || [],
        fat: pickNutrient(nutrients, "Fat"),
        title: recipe.title || "Unknown Recipe",
        sourceUrl: recipe.sourceUrl || undefined,
        servings: roundValue(recipe.servings) || 1,
        protein: pickNutrient(nutrients, "Protein"),
        calories: pickNutrient(nutrients, "Calories"),
        carbs: pickNutrient(nutrients, "Carbohydrates"),
        readyInMinutes: roundValue(recipe.readyInMinutes) || 0,
        ingredients:
            recipe.extendedIngredients?.map((ing) => ({
                name: ing.name,
                unit: ing.unit,
                amount: ing.amount,
                original: ing.original,
            })) || [],
    };
}
