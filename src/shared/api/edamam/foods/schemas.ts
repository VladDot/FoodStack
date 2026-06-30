import { z } from "zod";

export type EdamamNutrients = z.infer<typeof edamamNutrientsSchema>;
export type EdamamFood = z.infer<typeof edamamFoodSchema>;
export type EdamamHint = z.infer<typeof edamamHintSchema>;

export const edamamNutrientsSchema = z.object({
    FAT: z.number().nullish(),
    CHOCDF: z.number().nullish(),
    PROCNT: z.number().nullish(),
    ENERC_KCAL: z.number().nullish(),
});

export const edamamFoodSchema = z.object({
    label: z.string(),
    foodId: z.string(),
    image: z.string().nullish(),
    nutrients: edamamNutrientsSchema.nullish(),
});

export const edamamHintSchema = z.object({
    food: edamamFoodSchema,
});

export const edamamFoodResponseSchema = z.object({
    hints: z.array(edamamHintSchema),
});
