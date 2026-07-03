import { useQuery } from "@tanstack/react-query";

import type { EdamamHint } from "@/shared/api/edamam/foods";
import {
    type CleanFoodItem,
    mapResponseToCleanFoodItems,
} from "@/entities/product/model";

const fetchFoodSearch = async (query: string): Promise<CleanFoodItem[]> => {
    const response = await fetch(
        `/api/food/search?query=${encodeURIComponent(query)}`,
    );

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Failed to search food");
    }

    const data: EdamamHint[] = await response.json();
    return mapResponseToCleanFoodItems(data);
};

export const useFoodSearch = (query: string) => {
    return useQuery({
        queryKey: ["food-search", query],
        queryFn: () => fetchFoodSearch(query),
        enabled: query.length >= 2,
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });
};
