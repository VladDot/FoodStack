'use client';

import { useUrlSearchQuery } from "@/shared/hooks";
import { RecipesSearchInput } from "@/features/recipes-search/ui/search-input";

import { RecipesSearchContent } from "./recipes-search-content";

export const RecipesSearchPage = () => {
    const { query, setQuery, debouncedQuery } = useUrlSearchQuery();

    const isQueryTooShort = query.length < 2;

    return (
        <div className="p-4 w-full">
            <h1 className="text-2xl font-bold mb-4 max-w-2xl mx-auto">
                Recipes Search
            </h1>

            <RecipesSearchInput
                value={query}
                minLength={2}
                onChange={setQuery}
            />

            {!isQueryTooShort && (
                <RecipesSearchContent
                    key={debouncedQuery}
                    query={debouncedQuery}
                />
            )}
        </div>
    );
};
