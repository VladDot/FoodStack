import { unstable_cache } from "next/cache";

import { logger, ApiError } from "@/shared/lib";

import { edamamConfig } from "./config";
import { EdamamHint, edamamFoodResponseSchema } from "./schemas";

function extractSessionToken(
    href: string | null | undefined,
): string | undefined {
    if (!href) return undefined;
    try {
        return new URL(href).searchParams.get("session") || undefined;
    } catch {
        return undefined;
    }
}

export async function getRawFoodsFromApi(
    query: string,
    cursor?: string,
): Promise<{ hints: EdamamHint[]; cursor?: string }> {
    const url = new URL("https://api.edamam.com/api/food-database/v2/parser");
    url.searchParams.set("ingr", query);
    url.searchParams.set("app_id", edamamConfig.EDAMAM_FOOD_APP_ID);
    url.searchParams.set("app_key", edamamConfig.EDAMAM_FOOD_APP_KEY);

    if (cursor) {
        url.searchParams.set("session", cursor);
    }

    const response = await fetch(url.toString());

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

    const nextCont = extractSessionToken(result.data._links?.next?.href);

    return { hints: result.data.hints, cursor: nextCont };
}

export const getSearchEdamamFoods = unstable_cache(
    async (params: { query: string; cursor?: string }) =>
        getRawFoodsFromApi(params.query, params.cursor),
    ["edamam-foods"],
    { revalidate: 60 * 60 * 24 },
);
