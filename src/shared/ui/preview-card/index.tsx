"use client";

import { useTranslations } from "next-intl";

import { LinkButton } from "../button";
import { RecipeCardProps } from "./types";
import { MacroCards } from "../macro-cards";
import { SkeletonImage } from "../skeleton-image";
import { ImagePlaceholder } from "../image-placeholder";

export const PreviewCard = ({
    item: { id, fat, image, title, carbs, fiber, protein, calories },
    detailsQuery,
    href = `/foods-search/${id}`,
}: RecipeCardProps) => {
    const t = useTranslations("search");
    const params = new URLSearchParams();
    if (detailsQuery) params.set("query", detailsQuery);
    if (image) params.set("image", image);
    const queryString = params.toString();
    return (
        <li className="bg-white p-2 rounded-2xl overflow-hidden border border-neutral-100 shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl shadow-brand-gray hover:scale-110 flex flex-col">
            {image ? (
                <SkeletonImage
                    src={image}
                    alt={title}
                    width={500}
                    height={400}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full aspect-4/3 rounded-2xl bg-neutral-100"
                />
            ) : (
                <div className="w-full aspect-4/3  flex items-center justify-center ">
                    <ImagePlaceholder />
                </div>
            )}

            <div className="p-4 flex flex-col gap-4">
                <h2 className="text-xl font-bold text-brand-dark uppercase tracking-wide line-clamp-1">
                    {title}
                </h2>
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
                    {t("viewDetails")}
                </LinkButton>
            </div>
        </li>
    );
};
