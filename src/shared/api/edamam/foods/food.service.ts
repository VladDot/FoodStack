import axios from "axios";

import { logger } from "@/shared/lib/logger";

import { edamamConfig } from "../config";
import { EdamamHint, edamamFoodResponseSchema } from "./schemas";

export async function searchEdamamFoods(query: string): Promise<EdamamHint[]> {
    const response = await axios.get(
        "https://api.edamam.com/api/food-database/v2/parser",
        {
            params: {
                ingr: query,
                app_id: edamamConfig.EDAMAM_FOOD_APP_ID,
                app_key: edamamConfig.EDAMAM_FOOD_APP_KEY,
            },
        },
    );

    const result = edamamFoodResponseSchema.safeParse(response.data);

    if (!result.success) {
        logger.error(
            { issues: result.error.issues },
            "Edamam food API response shape changed",
        );
        return [];
    }

    return result.data.hints;
}
