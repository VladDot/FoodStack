import Image from "next/image";

import { titleNormalizeName } from "@/shared/utils";
import { HealthLabels, CaloriesDisplay, ImagePlaceholder } from "@/shared/ui";

import { CleanFoodDetailItem } from "../../model/types";

interface FoodHeaderProps {
    food: CleanFoodDetailItem;
}

export const FoodHeader = ({ food }: FoodHeaderProps) => {
    return (
        <div className="flex flex-col sm:flex-row gap-5 mb-6">
            <div className="shrink-0">
                {food.image ? (
                    <Image
                        width={160}
                        height={160}
                        src={food.image}
                        alt={food.title}
                        className="w-40 h-40 object-cover rounded-2xl shadow-sm"
                    />
                ) : (
                    <ImagePlaceholder />
                )}
            </div>
            <div className="flex flex-col justify-around ">
                <h1 className="text-2xl font-bold text-zinc-800 truncate">
                    {titleNormalizeName(food.title)}
                </h1>
                {food.healthLabels && food.healthLabels.length > 0 && (
                    <HealthLabels labels={food.healthLabels} />
                )}
                <CaloriesDisplay
                    calories={food.calories}
                    totalWeight={food.totalWeight}
                />
            </div>
        </div>
    );
};
