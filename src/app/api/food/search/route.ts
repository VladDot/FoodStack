import { searchEdamamFoods } from "@/shared/api/edamam";
import { createBffHandler } from "@/shared/api/bff/createEdamamHandler";

export const GET = createBffHandler(searchEdamamFoods);
