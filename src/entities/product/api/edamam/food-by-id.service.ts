import { unstable_cache } from "next/cache";

import { logger, ApiError } from "@/shared/lib";

import { edamamConfig } from "./config";
import { EdamamDetailedFood, edamamDetailedFoodSchema } from "./schemas";

export async function getFoodByIdFromApi(
    foodId: string,
): Promise<EdamamDetailedFood | null> {
    const url = new URL(
        "https://api.edamam.com/api/food-database/v2/nutrients",
    );
    url.searchParams.set("app_id", edamamConfig.EDAMAM_FOOD_APP_ID);
    url.searchParams.set("app_key", edamamConfig.EDAMAM_FOOD_APP_KEY);

    const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ingredients: [
                {
                    quantity: 100,
                    measureURI:
                        "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
                    foodId: foodId,
                },
            ],
        }),
    });
    if (!response.ok) {
        let detail = `HTTP ${response.status}`;
        try {
            const body = await response.json();
            if (body.message) detail = body.message;
        } catch (parseError) {
            logger.warn(
                { status: response.status, parseError },
                "Failed to parse Edamam error body",
            );
        }
        throw new ApiError(response.status, `Edamam API error: ${detail}`);
    }

    const data = await response.json();
    const foodData = data?.ingredients?.[0]?.parsed?.[0].food;

    if (!foodData) {
        logger.error(
            { foodId },
            "Food data is missing in Edamam nutrients response",
        );
        return null;
    }
    const result = edamamDetailedFoodSchema.safeParse(foodData);

    if (!result.success) {
        logger.error(
            { issues: result.error.issues },
            "Edamam detailed food API response shape changed",
        );
        throw new Error(
            "External food database service is temporarily unavailable",
        );
    }

    return result.data;
}

export const getProductById = unstable_cache(
    async (foodId: string): Promise<EdamamDetailedFood | null> =>
        getFoodByIdFromApi(foodId),
    ["edamam-food-detail"],
    {
        revalidate: 60 * 60 * 24 * 7,
        tags: ["food-details"],
    },
);
