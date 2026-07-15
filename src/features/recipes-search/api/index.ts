import { useInfiniteQuery } from "@tanstack/react-query";

import type { CleanRecipeItem } from "@/entities/recipes/model";
import { mapResponseToCleanRecipeItems } from "@/entities/recipes/model";
import type { SpoonacularRecipeResponse } from "@/shared/api/spoonacular";

type RecipesSearchPage = {
    items: CleanRecipeItem[];
    nextOffset: number | undefined;
};

const fetchRecipesSearch = async (
    query: string,
    offset: number,
): Promise<RecipesSearchPage> => {
    const response = await fetch(
        `/api/recipes/search?query=${encodeURIComponent(query)}&offset=${offset}`,
    );

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Failed to search recipes");
    }

    const data: SpoonacularRecipeResponse = await response.json();

    return {
        items: mapResponseToCleanRecipeItems(data.results),
        nextOffset:
            offset + data.number >= data.totalResults
                ? undefined
                : offset + data.number,
    };
};

export const useRecipesSearch = (query: string) => {
    return useInfiniteQuery({
        queryKey: ["recipes-search", query],
        queryFn: ({ pageParam }) => fetchRecipesSearch(query, pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextOffset,
        enabled: query.length >= 2,
        staleTime: 30 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
    });
};
