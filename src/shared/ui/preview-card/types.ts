type PreviewCardItem = {
    id: string;
    fat: number;
    carbs: number;
    title: string;
    fiber?: number;
    image?: string;
    protein: number;
    calories: number;
};
export type RecipeCardProps = {
    href?: string;
    detailsQuery?: string;
    item: PreviewCardItem;
};
