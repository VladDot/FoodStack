import { useInfiniteQuery } from "@tanstack/react-query";

import { ApiError } from "@/shared/lib";
import type { CleanRecipeItem } from "@/entities/recipes/model";
import { mapResponseToCleanRecipeItems } from "@/entities/recipes/model";
import type { SpoonacularRecipe } from "@/shared/api/spoonacular/recipes/schemas";

type BffRecipesSearchResponse = {
    items: SpoonacularRecipe[];
    nextOffset: number | null;
};

type RecipesSearchPage = {
    items: CleanRecipeItem[];
    nextOffset: number | null;
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
        throw new ApiError(
            response.status,
            body.error || "Failed to search recipes",
        );
    }

    const data: BffRecipesSearchResponse = await response.json();

    return {
        items: mapResponseToCleanRecipeItems(data.items),
        nextOffset: data.nextOffset,
    };
};

export const useRecipesSearch = (query: string) => {
    return useInfiniteQuery({
        queryKey: ["recipes-search", query],
        queryFn: ({ pageParam }) => fetchRecipesSearch(query, pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextOffset ?? undefined,
        enabled: query.length >= 2,
        staleTime: 30 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
    });
};
