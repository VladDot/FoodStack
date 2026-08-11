import { CleanFoodItem } from "@/entities/food/model";

import { LinkButton } from "../button";
import { MacroCards } from "../macro-cards";
import { SkeletonImage } from "../skeleton-image";
import { ImagePlaceholder } from "../image-placeholder";

type RecipeCardProps = {
    href?: string;
    detailsQuery?: string;
    item: CleanFoodItem & {
        fiber?: number;
        healthLabels?: string[];
    };
};

export const PreviewCard = ({
    item: { id, fat, image, title, carbs, fiber, protein, calories },
    detailsQuery,
    href = `/foods-search/${id}`,
}: RecipeCardProps) => {
    const params = new URLSearchParams();
    if (detailsQuery) params.set("query", detailsQuery);
    if (image) params.set("image", image);
    const queryString = params.toString();
    return (
        <div className="bg-white p-2 rounded-2xl overflow-hidden border border-neutral-100 shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl shadow-brand-gray hover:scale-110 flex flex-col">
            {image ? (
                <SkeletonImage
                    src={image}
                    alt={title}
                    width={500}
                    height={400}
                    className="w-full aspect-4/3 rounded-2xl bg-neutral-100"
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
                    href={`${href}${queryString ? `?${queryString}` : ""}`}
                >
                    View Details
                </LinkButton>
            </div>
        </div>
    );
};
