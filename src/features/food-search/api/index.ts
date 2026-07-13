import { useInfiniteQuery } from "@tanstack/react-query";

import type { EdamamHint } from "@/shared/api/edamam/foods";
import type { CleanFoodItem } from "@/entities/product/model/types";
import { mapResponseToCleanFoodItems } from "@/entities/product/model/product.mapper";

type FoodSearchResponse = {
    hints: EdamamHint[];
    cursor?: string;
};

type FoodSearchPage = {
    items: CleanFoodItem[];
    cursor?: string;
};

const fetchFoodSearch = async (
    query: string,
    cursor?: string,
): Promise<FoodSearchPage> => {
    const params = new URLSearchParams({ query });
    if (cursor) params.set("cursor", cursor);

    const response = await fetch(`/api/food/search?${params}`);

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Failed to search food");
    }

    const data: FoodSearchResponse = await response.json();
    return {
        items: mapResponseToCleanFoodItems(data.hints),
        cursor: data.cursor,
    };
};

export const useInfiniteFoodSearch = (query: string) => {
    return useInfiniteQuery({
        queryKey: ["food-search", query],
        queryFn: ({ pageParam }) => fetchFoodSearch(query, pageParam),
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => lastPage.cursor,
        enabled: query.length >= 2,
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });
};
