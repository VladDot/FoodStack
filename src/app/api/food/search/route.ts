import { createBffHandler } from "@/shared/api/bff/createHandler";
import { searchEdamamFoods } from "@/shared/api/edamam";

export const GET = createBffHandler(searchEdamamFoods);
