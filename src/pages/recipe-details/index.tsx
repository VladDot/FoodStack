import { notFound } from "next/navigation";

import { ApiError } from "@/shared/lib";
import { BackButton } from "@/shared/ui";
import { getRecipeById } from "@/entities/recipes/api/spoonacular";
import { RecipeDetail } from "@/entities/recipes/ui/recipe-detail";
import { mapResponseToCleanRecipeDetail } from "@/entities/recipes/model";

interface RecipeDetailPageProps {
    id: string;
}

export const RecipeDetailPage = async ({ id }: RecipeDetailPageProps) => {
    let rawRecipe;

    try {
        rawRecipe = await getRecipeById(id);
    } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
            notFound();
        }
        throw error;
    }

    const recipe = mapResponseToCleanRecipeDetail(rawRecipe);

    return (
        <section className="max-w-4xl mx-auto px-4 py-8">
            <BackButton />
            <RecipeDetail recipe={recipe} />
        </section>
    );
};
