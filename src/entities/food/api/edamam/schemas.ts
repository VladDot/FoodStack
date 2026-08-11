import { z } from "zod";

export type EdamamNutrients = z.infer<typeof edamamNutrientsSchema>;
export type EdamamFood = z.infer<typeof edamamFoodSchema>;
export type EdamamHint = z.infer<typeof edamamHintSchema>;
export type EdamamDetailedFood = z.infer<typeof edamamDetailSchema>;

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

export const edamamDetailSchema = z.object({
    uri: z.string(),
    calories: z.number(),
    totalWeight: z.number(),
    dietLabels: z.array(z.string()),
    healthLabels: z.array(z.string()),
    cautions: z.array(z.string()),
    totalNutrients: z.record(
        z.string(),
        z.object({
            label: z.string(),
            quantity: z.number(),
            unit: z.string(),
        }),
    ),
    totalDaily: z.record(
        z.string(),
        z.object({
            label: z.string(),
            quantity: z.number(),
            unit: z.string(),
        }),
    ),
    ingredients: z.array(
        z.object({
            parsed: z
                .array(
                    z.object({
                        quantity: z.number(),
                        measure: z.string(),
                        food: z.string(),
                        foodId: z.string(),
                        weight: z.number(),
                        retainedWeight: z.number(),
                        measureURI: z.string(),
                        status: z.string(),
                    }),
                )
                .optional(),
        }),
    ),
});
