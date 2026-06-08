export interface CleanRecipeItem {
  id: string;
  fat: number;
  carbs: number;
  image: string;
  title: string;
  protein: number;
  calories: number;
  servings: number;
  ingredients: string[];
}
export interface CleanFoodItem {
  id: string;          
  fat: number;         
  kcal: number;        
  carbs: number;       
  label: string;       
  image?: string;     
  protein: number;     
}
