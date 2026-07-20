import { z } from "zod";
import { NextRequest } from "next/server";

import { ApiError } from "@/shared/lib";

import { mapResponseToCleanFoodItems } from "../model";
import { getSearchEdamamFoods } from "./edamam/food.service";

const searchParamsSchema = z.object({
    query: z.string().trim().min(1, "Search query cannot be empty"),
    cursor: z.string().optional(),
});

export async function searchEdamamFoods(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const rawQuery = searchParams.get("query") || "";
    const rawCursor = searchParams.get("cursor") || undefined;

    const validation = searchParamsSchema.safeParse({
        query: rawQuery,
        cursor: rawCursor,
    });

    if (!validation.success) {
        throw new ApiError(
            400,
            validation.error.issues[0]?.message || "Invalid request",
        );
    }

    const rawData = await getSearchEdamamFoods({
        query: validation.data.query,
        cursor: validation.data.cursor,
    });

    return {
        items: mapResponseToCleanFoodItems(rawData.hints),
        cursor: rawData.cursor,
    };
}
