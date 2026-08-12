import { notFound } from "next/navigation";

import { ApiError } from "@/shared/lib";
import { BackButton } from "@/shared/ui";
import { FoodDetail } from "@/entities/food/ui/food-detail";
import { getFoodById } from "@/entities/food/api/edamam/food-details.service";
import { mapResponseToCleanFoodDetail } from "@/entities/food/model/food-detailed.mapper";

interface IFoodDetailPage {
    id: string;
    image?: string;
}

export const FoodDetailPage = async ({ id, image }: IFoodDetailPage) => {
    let rawFood;

    try {
        rawFood = await getFoodById(id);
    } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
            notFound();
        }
        throw error;
    }

    const food = mapResponseToCleanFoodDetail(rawFood);

    if (image) {
        food.image = image;
    }

    return (
        <section className="max-w-4xl mx-auto px-4 py-8">
            <BackButton />
            <FoodDetail food={food} />
        </section>
    );
};
