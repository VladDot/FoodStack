import Image from "next/image";

import { CleanFoodItem } from "@/entities/food/model";

import { LinkButton } from "../button";
import { MacroCards } from "../macro-cards";
import { ImagePlaceholder } from "../image-placeholder";

type RecipeCardProps = {
    detailsQuery?: string;
    item: CleanFoodItem & {
        fiber?: number;
        healthLabels?: string[];
    };
};

export const PreviewCard = ({
    item: { id, fat, image, title, carbs, fiber, protein, calories },
    detailsQuery,
}: RecipeCardProps) => {
    const params = new URLSearchParams();
    if (detailsQuery) params.set("query", detailsQuery);
    if (image) params.set("image", image);
    const queryString = params.toString();
    return (
        <div className="bg-white p-2 rounded-2xl overflow-hidden border border-neutral-100 shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl shadow-brand-gray hover:scale-110 flex flex-col">
            {image ? (
                <Image
                    src={image}
                    alt={title}
                    width={500}
                    height={400}
                    className="w-full aspect-4/3 object-cover bg-neutral-100 rounded-2xl"
                />
            ) : (
                <div className="w-full aspect-4/3  flex items-center justify-center ">
                    <ImagePlaceholder />
                </div>
            )}

            <div className="p-4 flex flex-col gap-4">
                <p className="text-xl font-bold text-brand-dark uppercase tracking-wide line-clamp-1">
                    {title}
                </p>
                <p className="text-md text-brand-dark/60">{calories} kcal</p>

                <MacroCards
                    fat={fat}
                    carbs={carbs}
                    fiber={fiber}
                    protein={protein}
                />
                <LinkButton
                    variant="outline"
                    href={`/foods-search/${id}${queryString ? `?${queryString}` : ""}`}
                >
                    View Details
                </LinkButton>
            </div>
        </div>
    );
};
