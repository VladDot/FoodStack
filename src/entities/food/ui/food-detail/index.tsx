import { MacroCards } from "@/shared/ui";

import { FoodHeader } from "./food-header";
import { FoodActions } from "./food-actions";
import { NutrientTable } from "./nutrient-table";
import { CleanFoodDetailItem } from "../../model/types";

interface FoodDetailProps {
    food: CleanFoodDetailItem;
}

export const FoodDetail = ({ food }: FoodDetailProps) => {
    return (
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-zinc-200">
            <FoodHeader food={food} />
            <MacroCards
                fat={food.fat}
                carbs={food.carbs}
                fiber={food.fiber}
                protein={food.protein}
                wrapperClassName="mb-6"
            />
            <NutrientTable food={food} />
            <FoodActions foodId={food.id} />
        </div>
    );
};
