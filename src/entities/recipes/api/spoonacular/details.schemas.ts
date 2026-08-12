import { z } from "zod";

export type SpoonacularRecipeDetail = z.infer<
    typeof spoonacularRecipeDetailSchema
>;

export const spoonacularIngredientDetailSchema = z.object({
    id: z.number().nullable(),
    name: z.string(),
    amount: z.number(),
    unit: z.string(),
    original: z.string(),
    image: z.string().nullable().optional(),
});

export const spoonacularNutrientDetailSchema = z.object({
    name: z.string(),
    amount: z.number(),
    unit: z.string(),
    percentOfDailyNeeds: z.number().optional(),
});

export const spoonacularNutritionDetailSchema = z.object({
    nutrients: z.array(spoonacularNutrientDetailSchema),
    caloricBreakdown: z
        .object({
            percentProtein: z.number(),
            percentFat: z.number(),
            percentCarbs: z.number(),
        })
        .optional(),
    weightPerServing: z
        .object({
            amount: z.number(),
            unit: z.string(),
        })
        .optional(),
});

const stepItemSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string().optional(),
});

export const spoonacularInstructionStepSchema = z.object({
    number: z.number(),
    step: z.string(),
    ingredients: z.array(stepItemSchema).optional(),
    equipment: z.array(stepItemSchema).optional(),
});

export const spoonacularAnalyzedInstructionSchema = z.object({
    name: z.string(),
    steps: z.array(spoonacularInstructionStepSchema),
});

export const spoonacularRecipeDetailSchema = z.object({
    id: z.number(),
    title: z.string(),
    image: z.string().url().nullable().optional(),
    summary: z.string().nullable().optional(),
    readyInMinutes: z.number().nullable().optional(),
    servings: z.number().nullable().optional(),
    sourceName: z.string().nullable().optional(),
    sourceUrl: z.string().url().nullable().optional(),
    dishTypes: z.array(z.string()).optional(),
    diets: z.array(z.string()).optional(),
    extendedIngredients: z.array(spoonacularIngredientDetailSchema).optional(),
    nutrition: spoonacularNutritionDetailSchema.optional(),
    analyzedInstructions: z
        .array(spoonacularAnalyzedInstructionSchema)
        .optional(),
    healthScore: z.number().nullable().optional(),
    pricePerServing: z.number().nullable().optional(),
});
