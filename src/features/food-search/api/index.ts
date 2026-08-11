import { useInfiniteQuery } from "@tanstack/react-query";

import { ApiError, getCursorNextPageParam } from "@/shared/lib";
import type { CleanFoodItem } from "@/entities/food/model/types";

type FoodSearchResponse = {
    cursor?: string;
    items: CleanFoodItem[];
};

const fetchFoodSearch = async (
    query: string,
    cursor?: string,
): Promise<FoodSearchResponse> => {
    const params = new URLSearchParams({ query });
    if (cursor) params.set("cursor", cursor);

    const response = await fetch(`/api/food/search?${params}`);

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new ApiError(
            response.status,
            body.error || "Failed to search food",
        );
    }

    return response.json();
};

export const useFoodSearch = (query: string) => {
    return useInfiniteQuery({
        queryKey: ["food-search", query],
        queryFn: ({ pageParam }) => fetchFoodSearch(query, pageParam),
        initialPageParam: undefined as string | undefined,
        getNextPageParam: getCursorNextPageParam,
        enabled: query.length >= 2,
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });
};
