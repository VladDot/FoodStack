import { createOffsetBffHandler } from "@/shared/api/bff";
import { searchSpoonacularRecipes } from "@/shared/api/spoonacular";

export const GET = createOffsetBffHandler(({ query, offset }) =>
    searchSpoonacularRecipes(query, offset),
);
