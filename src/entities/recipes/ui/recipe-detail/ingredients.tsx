import { roundValue } from "@/shared/utils";

import { RecipeIngredient } from "../../model/types";

interface IngredientsProps {
    ingredients: RecipeIngredient[];
}

export const Ingredients = ({ ingredients }: IngredientsProps) => {
    if (ingredients.length === 0) return null;

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-800 mb-3 border-b border-zinc-200 pb-2">
                Ingredients
            </h2>
            <ul className="space-y-2">
                {ingredients.map((ingredient, index) => (
                    <li
                        key={`${ingredient.name}-${index}`}
                        className="flex justify-between gap-4 py-2.5 px-4 text-sm rounded-xl border border-slate-100"
                    >
                        <span className="text-slate-600">
                            {ingredient.original || ingredient.name}
                        </span>
                        <span className="font-medium text-slate-900 shrink-0">
                            {roundValue(ingredient.amount)} {ingredient.unit}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
