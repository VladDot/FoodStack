import { notFound } from "next/navigation";

import { FoodDetail } from "@/entities/product/ui/food-detail";
import { getProductById } from "@/entities/product/api/edamam/food-by-id.service";
import { mapResponseToCleanFoodItemsDetail } from "@/entities/product/model/product-detailed.mapper";

interface IFoodDetailPage {
    id: string;
    image?: string;
}

export const FoodDetailPage = async ({ id, image }: IFoodDetailPage) => {
    const rawFood = await getProductById(id);

    if (!rawFood) {
        notFound();
    }

    const food = mapResponseToCleanFoodItemsDetail(rawFood);

    if (image) {
        food.image = image;
    }

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <FoodDetail food={food} />
        </main>
    );
};
