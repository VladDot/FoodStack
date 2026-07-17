import Image from "next/image";

type RecipeCardProps = {
    fat: number;
    carbs: number;
    title: string;
    image?: string;
    protein: number;
    calories: number;
};

export const PreviewCard = ({
    fat,
    image,
    title,
    carbs,
    protein,
    calories,
}: RecipeCardProps) => (
    <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm transition-shadow hover:shadow-md flex flex-col">
        {image ? (
            <Image
                src={image}
                alt={title}
                width={400}
                height={300}
                className="w-full aspect-4/3 object-cover bg-neutral-100"
            />
        ) : (
            <div className="w-full aspect-4/3 bg-neutral-100 flex items-center justify-center text-sm text-brand-gray">
                No image
            </div>
        )}

        <div className="p-4 flex flex-col gap-2">
            <p className="text-sm font-bold text-brand-dark uppercase tracking-wide line-clamp-1">
                {title}
            </p>

            <p className="text-sm text-brand-dark/60">{calories} kcal</p>

            <div className="flex items-center gap-3 text-xs font-medium text-brand-dark/80">
                <span>Protein: {protein}g</span>
                <span>Fat: {fat}g</span>
                <span>Carbs: {carbs}g</span>
            </div>
        </div>
    </div>
);
