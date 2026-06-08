import axios from "axios";

import { CleanRecipeItem } from "./types";

interface EdamamNutrientInfo {
  quantity: number;
}
interface EdamamRecipeNutrients {
  FAT?: EdamamNutrientInfo;
  CHOCDF?: EdamamNutrientInfo;
  PROCNT?: EdamamNutrientInfo;
  ENERC_KCAL?: EdamamNutrientInfo;
}
interface EdamamRecipe {
  uri: string;
  image: string;
  label: string;
  yield: number;
  calories: number;
  ingredientLines: string[];
  totalNutrients: EdamamRecipeNutrients;
}
interface EdamamRecipeHint {
  recipe: EdamamRecipe;
}

function mapResponseToCleanRecipeItems(hints: EdamamRecipeHint[]): CleanRecipeItem[] {
  if(!hints || hints.length === 0) return [];

  const roundValue = (value?: number) => {
        if (value === undefined || value === null || isNaN(value)) return 0;
        return Math.round(value * 10) / 10;
      };

  return hints.map(hint => {
    const recipe = hint?.recipe
    const nutrients = recipe?.totalNutrients || {};

    const recipeId = recipe?.uri?.split('_recipe_')[1] ||crypto.randomUUID();

    return {
      id: recipeId,
      image: recipe?.image || '',
      calories: roundValue(recipe?.calories),
      title: recipe?.label || 'Unknown Recipe',
      servings: roundValue(recipe?.yield) || 1,
      fat: roundValue(nutrients.FAT?.quantity),
      ingredients: recipe?.ingredientLines || [],
      carbs: roundValue(nutrients.CHOCDF?.quantity),
      protein: roundValue(nutrients.PROCNT?.quantity),
    }
  })
}

export async function searchEdamamRecipes(query: string): Promise<CleanRecipeItem[]> {
const appId = process.env.EDAMAM_RECIPE_APP_ID;
const appKey = process.env.EDAMAM_RECIPE_APP_KEY;

  if (!appId || !appKey) {
    console.error('Edamam API credentials are not set.');
    throw new Error('CONFIG_ERROR');
  }

  const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
  params:{
    q: query,
    app_id: appId,
    type: 'public',
    app_key: appKey,
  },
})

  if (!response.data.hits || response.data.hits.length === 0) {
    return [];
  }

  return mapResponseToCleanRecipeItems(response.data.hits);
}
