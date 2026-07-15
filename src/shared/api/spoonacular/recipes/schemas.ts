import { z } from "zod";

export type SpoonacularNutrientInfo = z.infer<
    typeof spoonacularNutrientInfoSchema
>;
export type SpoonacularNutrition = z.infer<typeof spoonacularNutritionSchema>;
export type SpoonacularIngredient = z.infer<typeof spoonacularIngredientSchema>;
export type SpoonacularRecipe = z.infer<typeof spoonacularRecipeSchema>;
export type SpoonacularRecipeResponse = z.infer<
    typeof spoonacularRecipeResponseSchema
>;

export const spoonacularNutrientInfoSchema = z.object({
    name: z.string().catch("Unknown"),
    amount: z.number().catch(0),
    unit: z.string().catch(""),
});

export const spoonacularNutritionSchema = z.object({
    nutrients: z.array(spoonacularNutrientInfoSchema).catch([]),
});

export const spoonacularIngredientSchema = z.object({
    original: z.string().catch("Unknown ingredient"),
});

export const spoonacularRecipeSchema = z.object({
    id: z.number(),
    title: z.string().catch("Untitled Recipe"),
    image: z.string().url().catch(""),
    servings: z.number().catch(1),
    extendedIngredients: z.array(spoonacularIngredientSchema).catch([]),

    nutrition: spoonacularNutritionSchema.optional().catch({ nutrients: [] }),
});

export const spoonacularRecipeResponseSchema = z.object({
    results: z.array(spoonacularRecipeSchema),
    offset: z.number(),
    number: z.number(),
    totalResults: z.number(),
});
