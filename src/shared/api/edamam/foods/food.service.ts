import { unstable_cache } from "next/cache";

import { logger, ApiError } from "@/shared/lib";

import { edamamConfig } from "../config";
import { EdamamHint, edamamFoodResponseSchema } from "./schemas";

export async function getRawFoodsFromApi(query: string): Promise<EdamamHint[]> {
    const url = new URL("https://api.edamam.com/api/food-database/v2/parser");
    url.searchParams.set("ingr", query);
    url.searchParams.set("app_id", edamamConfig.EDAMAM_FOOD_APP_ID);
    url.searchParams.set("app_key", edamamConfig.EDAMAM_FOOD_APP_KEY);

    const response = await fetch(url.toString());

    if (!response.ok) {
        let detail = `HTTP ${response.status}`;
        try {
            const body = await response.json();
            if (body.message) detail = body.message;
        } catch {
            /* ignore parse error */
        }
        throw new ApiError(response.status, `Edamam API error: ${detail}`);
    }

    const data = await response.json();

    const result = edamamFoodResponseSchema.safeParse(data);

    if (!result.success) {
        logger.error(
            { issues: result.error.issues },
            "Edamam food API response shape changed",
        );
        throw new Error(
            "External food database service is temporarily unavailable",
        );
    }

    return result.data.hints;
}

export const searchEdamamFoods = unstable_cache(
    async (query: string) => getRawFoodsFromApi(query),
    ["edamam-foods"],
    { revalidate: 60 * 60 * 24 },
);
