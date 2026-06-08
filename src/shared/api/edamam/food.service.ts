import axios from "axios";

import { logger } from "@/shared/lib/logger";

import { CleanFoodItem } from "./types";

interface EdamamNutrients {
  FAT?: number;
  CHOCDF?: number;
  PROCNT?: number;
  ENERC_KCAL?: number;
}
interface EdamamFood {
  label: string;
  foodId: string;
  image?: string;
  nutrients?: EdamamNutrients;
}
interface EdamamHint {
  food: EdamamFood;
}

function mapResponseToCleanFoodItems(hints: EdamamHint[]): CleanFoodItem[] { 
  if(!hints || hints.length === 0) return [];

  return hints.map(hint => {
    const food = hint?.food
    const nutrients = food.nutrients || {};

const roundValue = (value?: number) => {
      if (value === undefined || value === null || isNaN(value)) return 0;
      return Math.round(value * 10) / 10;
    };

    return {
      id: food.foodId || food.label, 
      image: food.image || undefined,
      fat: roundValue(nutrients.FAT),
      label: food.label || 'Unknown Food',
      carbs: roundValue(nutrients.CHOCDF),
      protein: roundValue(nutrients.PROCNT),
      kcal: roundValue(nutrients.ENERC_KCAL),
    }
  })
}

export async function searchEdamamFoods(query: string): Promise<CleanFoodItem[]> {
  const appId = process.env.EDAMAM_FOOD_APP_ID;
  const appKey = process.env.EDAMAM_FOOD_APP_KEY;

  if (!appId || !appKey) {
        logger.error('Food API keys are missing on the server');
throw new Error('CONFIG_ERROR');      }

     const response = await axios.get('https://api.edamam.com/api/food-database/v2/parser', {
      params: {
          ingr: query,
        app_id: appId,
        app_key: appKey,
      },
    });

    if (!response.data.hints || response.data.hints.length === 0) {
      return [];
      }

return mapResponseToCleanFoodItems(response.data.hints);

}
