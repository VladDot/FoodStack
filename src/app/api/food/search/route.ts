import { createBffHandler } from "@/shared/api/bff";
import { searchEdamamFoods } from "@/entities/product/api/searchEdamamFoods";

export const GET = createBffHandler(searchEdamamFoods);
