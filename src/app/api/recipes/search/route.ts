import { createBffHandler } from "@/shared/api/bff/createHandler";
import { searchEdamamRecipes } from "@/shared/api/edamam";

export const GET = createBffHandler(searchEdamamRecipes);
