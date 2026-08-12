import { MacroCards, CaloriesDisplay } from "@/shared/ui";

import { Ingredients } from "./ingredients";
import { Instructions } from "./instructions";
import { RecipeHeader } from "./recipe-header";
import { CleanRecipeDetailItem } from "../../model/types";

interface RecipeDetailProps {
    recipe: CleanRecipeDetailItem;
}

export const RecipeDetail = ({ recipe }: RecipeDetailProps) => {
    return (
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-zinc-200">
            <RecipeHeader recipe={recipe} />

            <CaloriesDisplay
                className="mt-2 mb-4"
                calories={recipe.calories}
            />

            <MacroCards
                fat={recipe.fat}
                carbs={recipe.carbs}
                wrapperClassName="mb-6"
                protein={recipe.protein}
            />

            <Ingredients ingredients={recipe.ingredients} />

            <Instructions steps={recipe.steps} />
        </div>
    );
};
