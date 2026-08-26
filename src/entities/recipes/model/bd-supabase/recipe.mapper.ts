export function mapRecipeToPreviewItem(recipe: {
    id: string;
    title: string;
    fat: number | null;
    carbs: number | null;
    protein: number | null;
    imageUrl: string | null;
    calories: number | null;
    externalRecipeId: string | null;
}) {
    return {
        id: recipe.id,
        title: recipe.title,
        fat: recipe.fat ?? 0,
        image: recipe.imageUrl,
        carbs: recipe.carbs ?? 0,
        protein: recipe.protein ?? 0,
        calories: recipe.calories ?? 0,
        externalRecipeId: recipe.externalRecipeId,
    };
}
