import { createBffHandler } from "@/shared/api/bff";
import { searchRecipesHandler } from "@/entities/recipes/api/search-recipes";

export const GET = createBffHandler(searchRecipesHandler);
