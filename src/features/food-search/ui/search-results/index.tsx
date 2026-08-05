"use client";

import { PreviewCard, SearchResults } from "@/shared/ui";
import type { CleanFoodItem } from "@/entities/product/model/types";

interface FoodSearchResultsProps {
    query: string;
    isError: boolean;
    isLoading: boolean;
    error: Error | null;
    hasNextPage: boolean;
    items: CleanFoodItem[];
    onLoadMore: () => void;
    isFetchingNextPage: boolean;
}

export const FoodSearchResults = ({
    items,
    error,
    query,
    isError,
    isLoading,
    onLoadMore,
    hasNextPage,
    isFetchingNextPage,
}: FoodSearchResultsProps) => {
    return (
        <SearchResults
            query={query}
            error={error}
            isError={isError}
            isLoading={isLoading}
            onLoadMore={onLoadMore}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isEmpty={query.length >= 2 && items.length === 0}
        >
            {items.map((item) => (
                <PreviewCard
                    item={item}
                    key={item.id}
                    detailsQuery={query}
                />
            ))}
        </SearchResults>
    );
};
