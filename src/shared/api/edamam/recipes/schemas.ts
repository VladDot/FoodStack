import { z } from "zod";

export type EdamamNutrientInfo = z.infer<typeof edamamNutrientInfoSchema>;
export type EdamamRecipeNutrients = z.infer<typeof edamamRecipeNutrientsSchema>;
export type EdamamRecipe = z.infer<typeof edamamRecipeSchema>;
export type EdamamRecipeHint = z.infer<typeof edamamRecipeHintSchema>;

export const edamamNutrientInfoSchema = z.object({
    quantity: z.number().nullish(),
    unit: z.string().nullish(),
});

export const edamamRecipeNutrientsSchema = z.object({
    FAT: edamamNutrientInfoSchema.nullish(),
    CHOCDF: edamamNutrientInfoSchema.nullish(),
    PROCNT: edamamNutrientInfoSchema.nullish(),
    ENERC_KCAL: edamamNutrientInfoSchema.nullish(),
});

export const edamamRecipeSchema = z.object({
    uri: z.string(),
    image: z.string(),
    label: z.string(),
    yield: z.number(),
    calories: z.number(),
    ingredientLines: z.array(z.string()),
    totalNutrients: edamamRecipeNutrientsSchema,
});

export const edamamRecipeHintSchema = z.object({
    recipe: edamamRecipeSchema,
});

export const edamamRecipeResponseSchema = z.object({
    hits: z.array(edamamRecipeHintSchema),
});
