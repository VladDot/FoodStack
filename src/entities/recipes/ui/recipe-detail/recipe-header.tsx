import { SkeletonImage, ImagePlaceholder } from "@/shared/ui";

import { CleanRecipeDetailItem } from "../../model/types";

interface RecipeHeaderProps {
    recipe: CleanRecipeDetailItem;
}

export const RecipeHeader = ({ recipe }: RecipeHeaderProps) => {
    return (
        <div className="flex flex-col gap-5 mb-6">
            {recipe.imageUrl ? (
                <SkeletonImage
                    width={800}
                    height={450}
                    alt={recipe.title}
                    src={recipe.imageUrl}
                    className="w-full aspect-video rounded-2xl shadow-sm"
                    sizes="(min-width: 1919px) 1736px, (min-width: 1440px) 1168px, 100vw"
                />
            ) : (
                <ImagePlaceholder className="w-full aspect-video" />
            )}

            <div>
                <h1 className="text-2xl font-bold text-zinc-800 truncate">
                    {recipe.title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-zinc-500">
                    <span>Servings: {recipe.servings}</span>
                    {recipe.readyInMinutes > 0 && (
                        <span>Time: {recipe.readyInMinutes} min</span>
                    )}
                </div>

                {recipe.diets.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {recipe.diets.map((diet) => (
                            <span
                                key={diet}
                                className="px-3 py-1 text-sm rounded-full bg-green-50 text-green-700"
                            >
                                {diet}
                            </span>
                        ))}
                    </div>
                )}

                {recipe.summary && (
                    <p className="text-sm text-zinc-600 mt-3">
                        {recipe.summary}
                    </p>
                )}
            </div>
        </div>
    );
};
