import { createBffHandler } from "@/shared/api/bff";
import { searchFoodsHandler } from "@/entities/food/api/search-foods";

export const GET = createBffHandler(searchFoodsHandler);
