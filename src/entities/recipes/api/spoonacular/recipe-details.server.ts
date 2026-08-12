import { unstable_cache } from "next/cache";

import { logger, ApiError, fetchWithTimeout } from "@/shared/lib";

import { spoonacularConfig } from "./config";
import {
    SpoonacularRecipeDetail,
    spoonacularRecipeDetailSchema,
} from "./details.schemas";

export async function fetchRecipesByIdFromSpoonacular(
    recipeId: string,
): Promise<SpoonacularRecipeDetail> {
    const url = new URL(
        `https://api.spoonacular.com/recipes/${recipeId}/information`,
    );

    url.searchParams.set("apiKey", spoonacularConfig.SPOONACULAR_API_KEY);
    url.searchParams.set("includeNutrition", "true");

    const response = await fetchWithTimeout(url);

    if (!response.ok) {
        if (response.status === 404) {
            throw new ApiError(404, "Food not found");
        }

        let detail = `HTTP ${response.status}`;

        if (response.status === 402 || response.status === 429) {
            detail = "Spoonacular API daily limit reached";
        } else {
            try {
                const body = await response.json();
                if (body.message) detail = body.message;
            } catch (parseError) {
                logger.warn(
                    { status: response.status, parseError },
                    "Failed to parse Spoonacular error body",
                );
            }
        }
        throw new ApiError(response.status, `Spoonacular API error: ${detail}`);
    }

    const data = await response.json();

    const result = spoonacularRecipeDetailSchema.safeParse(data);

    if (!result.success) {
        logger.error(
            { issues: result.error.issues },
            "Spoonacular recipe detail API response shape changed",
        );
        throw new Error(
            "External recipe database service is temporarily unavailable",
        );
    }

    return result.data;
}

export const getRecipeById = unstable_cache(
    async (recipeId: string): Promise<SpoonacularRecipeDetail> =>
        fetchRecipesByIdFromSpoonacular(recipeId),
    ["spoonacular-recipe-detail"],
    { revalidate: 60 * 60 * 24 * 7, tags: ["recipe-details"] },
);
