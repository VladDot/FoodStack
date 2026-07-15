import { createOffsetBffHandler } from "@/shared/api/bff";
import { searchSpoonacularRecipes } from "@/shared/api/spoonacular";

const PAGE_LIMIT = 20;

export const GET = createOffsetBffHandler(async ({ query, offset }) => {
    const data = await searchSpoonacularRecipes(query, offset);

    const items = data.results || []; 
    const returnedCount = items.length;
    const limit = data.number || PAGE_LIMIT;

    const hasMore =
        returnedCount === limit &&
        offset + returnedCount < (data.totalResults || 0);

    return {
        items,
        nextOffset: hasMore ? offset + returnedCount : null,
    };
});
