export type BasePreviewCardItem = {
    id: string;
    fat: number;
    carbs: number;
    title: string;
    fiber?: number;
    protein: number;
    calories: number;
    image?: string | null;
};
export type PreviewCardItem<T extends BasePreviewCardItem> = {
    item: T;
    href: string;
    detailsQuery?: string;
};
