import { z } from "zod";
import { NextRequest } from "next/server";

import { ApiError } from "@/shared/lib";

import { getProductById } from "./edamam/food-by-id.service";
import { mapResponseToCleanFoodItemsDetail } from "../model/product-detailed.mapper";

interface FoodDetailContext {
    params: Promise<{
        id: string;
    }>;
}

const detailParamsSchema = z.object({
    id: z.string().trim().min(1, "Food ID cannot be empty"),
});

export async function getEdamamFoodDetail(
    request: NextRequest,
    context: FoodDetailContext,
) {
    const { id } = await context.params;

    const validation = detailParamsSchema.safeParse({ id });

    if (!validation.success) {
        throw new ApiError(
            400,
            validation.error.issues[0]?.message || "Invalid ID",
        );
    }

    const rawFood = await getProductById(validation.data.id);

    if (!rawFood) {
        throw new ApiError(404, "Food product not found");
    }

    return mapResponseToCleanFoodItemsDetail(rawFood);
}
