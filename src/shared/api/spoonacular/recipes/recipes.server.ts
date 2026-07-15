import { unstable_cache } from "next/cache";

import { ApiError } from "@/shared/lib";
import { logger } from "@/shared/lib/logger";

import { spoonacularConfig } from "../config";
import { SpoonacularRecipeResponse, spoonacularRecipeResponseSchema } from "./schemas";

export async function getRawRecipesFromApi(
    query: string,
    offset: number = 0,
): Promise<SpoonacularRecipeResponse> {
    const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
    url.searchParams.set("apiKey", spoonacularConfig.SPOONACULAR_API_KEY);
    url.searchParams.set("query", query);
    url.searchParams.set("offset", String(offset));
    url.searchParams.set("number", "100");
    url.searchParams.set("addRecipeNutrition", "true");

    const response = await fetch(url.toString());

    if (!response.ok) {
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
    const result = spoonacularRecipeResponseSchema.safeParse(data);

    if (!result.success) {
        logger.error(
            { issues: result.error.issues },
            "Spoonacular recipe API response shape changed",
        );
        throw new Error(
            "External recipe database service is temporarily unavailable",
        );
    }

    return result.data;
}

export const searchSpoonacularRecipes = unstable_cache(
    async (query: string, offset: number) =>
        getRawRecipesFromApi(query, offset),
    ["spoonacular-recipes"],
    { revalidate: 60 * 60 * 24 },
);
