import { useQuery } from "@tanstack/react-query";

import { EdamamRecipeHint } from "@/shared/api/edamam";
import {
    type CleanRecipeItem,
    mapResponseToCleanRecipeItems,
} from "@/entities/recipes/model";

const fetchRecipesSearch = async (
    query: string,
): Promise<CleanRecipeItem[]> => {
    const response = await fetch(
        `/api/recipes/search?query=${encodeURIComponent(query)}`,
    );

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Failed to search recipes");
    }

    const data: EdamamRecipeHint[] = await response.json();
    return mapResponseToCleanRecipeItems(data);
};

export const useRecipesSearch = (query: string) => {
    return useQuery({
        queryKey: ["recipes-search", query],
        queryFn: () => fetchRecipesSearch(query),
        enabled: query.length >= 2,
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });
};
