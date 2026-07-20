export type CleanFoodItem = {
    id: string;
    fat: number;
    carbs: number;
    title: string;
    image?: string;
    protein: number;
    calories: number;
};
export type CleanDetailedFoodItem = CleanFoodItem & {
    brand?: string;
    fiber?: number;
    category?: string;
    ingredients?: string;
};
