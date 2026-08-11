import { roundValue } from "@/shared/utils";

import { CleanRecipeDetailItem } from "./types";
import { SpoonacularRecipeDetail } from "../api/spoonacular";

export function mapResponseToCleanRecipeDetail(
    recipe: SpoonacularRecipeDetail,
): CleanRecipeDetailItem {
    const nutrients = recipe.nutrition?.nutrients || [];

    const findNutrient = (name: string): number => {
        const amount = nutrients.find(
            (n) => n.name.toLowerCase() === name.toLowerCase(),
        )?.amount;
        return amount ?? 0;
    };

    const summary = (recipe.summary || "").replace(/<[^>]*>/g, "").trim();

    const steps =
        recipe.analyzedInstructions?.flatMap((section) =>
            section.steps.map((step) => ({
                text: step.step,
                number: step.number,
            })),
        ) || [];

    return {
        steps,
        summary,
        id: String(recipe.id),
        image: recipe.image || "",
        diets: recipe.diets || [],
        dishTypes: recipe.dishTypes || [],
        fat: roundValue(findNutrient("Fat")),
        title: recipe.title || "Unknown Recipe",
        sourceUrl: recipe.sourceUrl || undefined,
        servings: roundValue(recipe.servings) || 1,
        protein: roundValue(findNutrient("Protein")),
        calories: roundValue(findNutrient("Calories")),
        carbs: roundValue(findNutrient("Carbohydrates")),
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
