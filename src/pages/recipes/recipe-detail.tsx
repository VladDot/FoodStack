import { notFound } from "next/navigation";

import { BackButton } from "@/shared/ui";
import { getRecipeById } from "@/entities/recipes/api/spoonacular";
import { RecipeDetail } from "@/entities/recipes/ui/recipe-detail";
import { mapResponseToCleanRecipeDetail } from "@/entities/recipes/model";

interface RecipeDetailPageProps {
    id: string;
}

export const RecipeDetailPage = async ({ id }: RecipeDetailPageProps) => {
    const rawRecipe = await getRecipeById(id);

    if (!rawRecipe) {
        notFound();
    }

    const recipe = mapResponseToCleanRecipeDetail(rawRecipe);

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <BackButton />
            <RecipeDetail recipe={recipe} />
        </main>
    );
};
