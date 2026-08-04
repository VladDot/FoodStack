import { createBffHandler } from "@/shared/api/bff";
import { getEdamamFoodDetail } from "@/entities/product/api/getEdamamFoodDetails";

export const GET = createBffHandler(getEdamamFoodDetail);
