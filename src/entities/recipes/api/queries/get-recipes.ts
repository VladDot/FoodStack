import { prisma } from "@/shared/api/prisma";

export const getRecipes = async () => {
    const recipes = await prisma.recipe.findMany({
        select: {
            id: true,
            fat: true,
            title: true,
            carbs: true,
            protein: true,
            imageUrl: true,
            calories: true,
            externalRecipeId: true,
        },
    });

    return recipes;
};
