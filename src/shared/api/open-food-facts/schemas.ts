import { z } from "zod";

const safeNumberSchema = z.unknown().transform((val) => {
    if (val === null || val === undefined || val === "") return 0;
    const parsed = Number(val);
    return isNaN(parsed) ? 0 : parsed;
});

const safeStringSchema = (defaultValue: string) =>
    z.unknown().transform((val) => {
        if (val === null || val === undefined || typeof val !== "string")
            return defaultValue;
        return val.trim();
    });

export const offNutrimentsSchema = z.object({
    "energy-kcal_100g": safeNumberSchema,
    proteins_100g: safeNumberSchema,
    fat_100g: safeNumberSchema,
    carbohydrates_100g: safeNumberSchema,
});

export const offProductSchema = z.object({
    code: z.string().min(1, "Штрих-код обов'язковий"),
    product_name: safeStringSchema("Невідомий продукт"),
    brands: safeStringSchema("Власний бренд"),

    image_front_url: z.unknown().transform((val) => {
        if (typeof val !== "string" || !val.trim()) return "";
        try {
            new URL(val);
            return val;
        } catch {
            return "";
        }
    }),

    nutriments: offNutrimentsSchema.optional().default({
        "energy-kcal_100g": 0,
        proteins_100g: 0,
        fat_100g: 0,
        carbohydrates_100g: 0,
    }),
});

export const offSearchResponseSchema = z.object({
    products: z.array(offProductSchema).default([]),
});

export const offBarcodeResponseSchema = z.object({
    status: z.coerce.number(),
    product: offProductSchema.optional(),
});

export type OFFProduct = z.infer<typeof offProductSchema>;
export type OFFSearchResponse = z.infer<typeof offSearchResponseSchema>;
export type OFFBarcodeResponse = z.infer<typeof offBarcodeResponseSchema>;
