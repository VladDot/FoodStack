export type CleanFoodItem = {
    id: string;
    fat: number;
    carbs: number;
    title: string;
    image?: string;
    protein: number;
    calories: number;
};
export type CleanFoodDetailItem = CleanFoodItem & {
    brand?: string;
    fiber?: number;
    category?: string;
    ingredients?: string;
    totalWeight?: number;
    dietLabels?: string[];
    healthLabels?: string[];
    totalDaily?: Record<string, NutrientInfo>;
    totalNutrients?: Record<string, NutrientInfo>;
};
export type NutrientInfo = {
    unit: string;
    label: string;
    quantity: number;
};
export type NutrientGroupId =
    | "macros"
    | "fats"
    | "vitamins"
    | "minerals"
    | "other";
export type GroupedNutrient = {
    unit: string;
    label: string;
    quantity: number;
};
export type NutrientGroupSection = {
    title: string;
    id: NutrientGroupId;
    items: GroupedNutrient[];
};
