import { unstable_cache } from "next/cache";

import { logger } from "@/shared/lib/logger";

import { edamamConfig } from "../config";
import { EdamamRecipeHint, edamamRecipeResponseSchema } from "./schemas";

class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
    ) {
        super(message);
    }
}

export async function getRawRecipesFromApi(
    query: string,
): Promise<EdamamRecipeHint[]> {
    const url = new URL("https://api.edamam.com/api/recipes/v2");
    url.searchParams.set("type", "public");
    url.searchParams.set("q", query);
    url.searchParams.set("app_id", edamamConfig.EDAMAM_RECIPE_APP_ID);
    url.searchParams.set("app_key", edamamConfig.EDAMAM_RECIPE_APP_KEY);

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
    const result = edamamRecipeResponseSchema.safeParse(data);

    if (!result.success) {
        logger.error(
            { issues: result.error.issues },
            "Edamam recipe API response shape changed",
        );
        throw new Error(
            "External recipe database service is temporarily unavailable",
        );
    }

    return result.data.hits;
}
export const searchEdamamRecipes = unstable_cache(
    async (query: string) => getRawRecipesFromApi(query),
    ["edamam-recipes"],
    { revalidate: 60 * 60 * 24 * 7 },
);
