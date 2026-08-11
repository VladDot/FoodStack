import { z } from "zod";
import { NextRequest } from "next/server";

import { ApiError } from "@/shared/lib";

import { mapResponseToCleanRecipeItems } from "../model";
import { getSearchRecipes } from "./spoonacular/recipes-search.server";

const PAGE_LIMIT = 20;

const searchParamsSchema = z.object({
    query: z.string().trim().min(1, "Search query cannot be empty"),
    offset: z.coerce.number().catch(0),
});

export async function searchRecipesHandler(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const rawQuery = searchParams.get("query") || "";
    const rawOffset = searchParams.get("offset") || "0";

    const validation = searchParamsSchema.safeParse({
        query: rawQuery,
        offset: rawOffset,
    });

    if (!validation.success) {
        throw new ApiError(
            400,
            validation.error.issues[0]?.message || "Invalid request",
        );
    }

    const { query, offset } = validation.data;
    const rawData = await getSearchRecipes({ query, offset });

    const items = rawData.results || [];
    const hasMore =
        items.length === (rawData.number || PAGE_LIMIT) &&
        offset + items.length < (rawData.totalResults || 0);

    return {
        items: mapResponseToCleanRecipeItems(items),
        nextOffset: hasMore ? offset + items.length : null,
    };
}
