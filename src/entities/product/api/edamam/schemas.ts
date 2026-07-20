import { z } from "zod";

export type EdamamNutrients = z.infer<typeof edamamNutrientsSchema>;
export type EdamamFood = z.infer<typeof edamamFoodSchema>;
export type EdamamHint = z.infer<typeof edamamHintSchema>;
export type EdamamDetailedNutrients = z.infer<
    typeof edamamDetailedNutrientsSchema
>;
export type EdamamDetailedFood = z.infer<typeof edamamDetailedFoodSchema>;
export type EdamamDetailedHint = z.infer<typeof edamamDetailedHintSchema>;

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

export const edamamLinksSchema = z
    .object({
        next: z
            .object({
                href: z.string(),
            })
            .nullish(),
    })
    .nullish();

export const edamamFoodResponseSchema = z.object({
    hints: z.array(edamamHintSchema),
    _links: edamamLinksSchema,
});

export const edamamDetailedNutrientsSchema = edamamNutrientsSchema.extend({
    FIBTG: z.number().nullish(),
});

export const edamamDetailedFoodSchema = edamamFoodSchema.extend({
    brand: z.string().nullish(),
    category: z.string().nullish(),
    categoryLabel: z.string().nullish(),
    foodContentsLabel: z.string().nullish(),
    nutrients: edamamDetailedNutrientsSchema.nullish(),
});

export const edamamDetailedHintSchema = z.object({
    food: edamamDetailedFoodSchema,
});
