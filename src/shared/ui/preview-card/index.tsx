import Image from "next/image";

import { CleanFoodItem } from "@/entities/product/model";

import { LinkButton } from "../button";

type RecipeCardProps = {
    item: CleanFoodItem;
};

export const PreviewCard = ({
    item: { image, title, calories, protein, fat, carbs, id },
}: RecipeCardProps) => (
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
            <div className="w-full aspect-4/3 bg-neutral-100 flex items-center justify-center text-sm text-brand-gray">
                No image
            </div>
        )}

        <div className="p-4 flex flex-col gap-4">
            <p className="text-xl font-bold text-brand-dark uppercase tracking-wide line-clamp-1">
                {title}
            </p>
            <p className="text-md text-brand-dark/60">{calories} kcal</p>

            <div className="flex flex-wrap justify-around gap-2 w-full max-w-[250px]">
                <span className="px-4 py-2 bg-brand-green text-white rounded-3xl ">
                    Protein: {protein}g
                </span>
                <span className="px-4 py-2 bg-brand-orange-active text-white rounded-3xl ">
                    Fat: {fat}g
                </span>
                <span className="px-4 py-2 bg-brand-orange text-white rounded-3xl ">
                    Carbohydrates: {carbs}g
                </span>
            </div>
            <LinkButton
                variant="outline"
                href={`/foods-search/${id}`}
            >
                <div className="flex justify-between gap-6 w-full items-center">
                    <span>Переглянути деталі</span>
                </div>
            </LinkButton>
        </div>
    </div>
);
