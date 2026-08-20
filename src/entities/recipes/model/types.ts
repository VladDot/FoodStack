export type CleanRecipeItem = {
    id: string;
    fat: number;
    carbs: number;
    image: string;
    title: string;
    protein: number;
    calories: number;
    servings: number;
    ingredients: string[];
};
export type RecipeIngredient = {
    name: string;
    unit: string;
    amount: number;
    original: string;
};
export type RecipeStep = {
    text: string;
    number: number;
};
export type RecipeStepSection = {
    name: string;
    steps: RecipeStep[];
};
export type CleanRecipeDetailItem = {
    id: string;
    fat: number;
    carbs: number;
    title: string;
    diets: string[];
    protein: number;
    summary: string;
    calories: number;
    imageUrl: string;
    servings: number;
    sourceUrl?: string;
    dishTypes: string[];
    readyInMinutes: number;
    steps: RecipeStepSection[];
    ingredients: RecipeIngredient[];
};
