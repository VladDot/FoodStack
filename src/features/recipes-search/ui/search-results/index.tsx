"use client";

import { PreviewCard, SearchResults } from "@/shared/ui";
import { CleanRecipeItem } from "@/entities/recipes/model";

interface RecipesSearchResultsProps {
    query: string;
    isError: boolean;
    isLoading: boolean;
    error: Error | null;
    hasNextPage: boolean;
    onLoadMore: () => void;
    items: CleanRecipeItem[];
    isFetchingNextPage: boolean;
}

export function RecipesSearchResults({
    items,
    error,
    query,
    isError,
    isLoading,
    onLoadMore,
    hasNextPage,
    isFetchingNextPage,
}: RecipesSearchResultsProps) {
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
                    key={item.id}
                    fat={item.fat}
                    image={item.image}
                    title={item.title}
                    carbs={item.carbs}
                    protein={item.protein}
                    calories={item.calories}
                />
            ))}
        </SearchResults>
    );
}
