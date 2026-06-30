import axios from "axios";

import { logger } from "@/shared/lib/logger";

import { edamamConfig } from "../config";
import { EdamamRecipeHint, edamamRecipeResponseSchema } from "./schemas";

export async function searchEdamamRecipes(
    query: string,
): Promise<EdamamRecipeHint[]> {
    const response = await axios.get("https://api.edamam.com/api/recipes/v2", {
        params: {
            q: query,
            type: "public",
            app_id: edamamConfig.EDAMAM_RECIPE_APP_ID,
            app_key: edamamConfig.EDAMAM_RECIPE_APP_KEY,
        },
    });

    const result = edamamRecipeResponseSchema.safeParse(response.data);

    if (!result.success) {
        logger.error(
            { issues: result.error.issues },
            "Edamam recipe API response shape changed",
        );
        return [];
    }

    return result.data.hits;
}
