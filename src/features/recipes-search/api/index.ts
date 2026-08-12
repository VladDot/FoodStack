import { useInfiniteQuery } from "@tanstack/react-query";

import { ApiError } from "@/shared/lib";
import type { CleanRecipeItem } from "@/entities/recipes/model";

type BffRecipesSearchResponse = {
    nextOffset: number | null;
    items: CleanRecipeItem[];
};

const fetchRecipesSearch = async (
    query: string,
    offset: number,
): Promise<BffRecipesSearchResponse> => {
    const response = await fetch(
        `/api/recipes/search?query=${encodeURIComponent(query)}&offset=${offset}`,
    );

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new ApiError(
            response.status,
            body?.error?.message || "Failed to search recipes",
            body?.error?.code,
        );
    }

    return response.json();
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
