import { PreviewCard } from "@/shared/ui";
import { routes } from "@/shared/constants";
import { getRecipes } from "@/entities/recipes/api/queries/get-recipes";
import { mapRecipeToPreviewItem } from "@/entities/recipes/model/bd-supabase/recipe.mapper";

export const SavedRecipesPage = async () => {
    const rawRecipes = await getRecipes();

    const recipes = rawRecipes.map(mapRecipeToPreviewItem);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recipes.map((recipe) => (
                <PreviewCard
                    item={recipe}
                    key={recipe.id}
                    href={`${routes.user.dashboard.saved}/${recipe.externalRecipeId}`}
                />
            ))}
        </div>
    );
};
