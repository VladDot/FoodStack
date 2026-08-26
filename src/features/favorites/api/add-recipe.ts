"use server";

import { auth } from "@/shared/lib/auth";
import { prisma } from "@/shared/api/prisma";
import { CleanRecipeDetailItem } from "@/entities/recipes/model";

export const addRecipeToFavorite = async (
    recipeData: CleanRecipeDetailItem,
) => {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error("User is not authenticated");
    }
    const { id, ...recipeRest } = recipeData;

    const data = {
        ...recipeRest,
        externalRecipeId: id,
    };

    const recipe = await prisma.recipe.upsert({
        where: { externalRecipeId: id },
        create: data,
        update: data,
    });

    await prisma.favoriteRecipes.upsert({
        where: {
            userId_recipeId: {
                userId,
                recipeId: recipe.id,
            },
        },
        create: {
            userId,
            recipeId: recipe.id,
        },
        update: {},
    });

    return {
        success: true,
        message: "Recipe added to favorites successfully.",
    };
};
