"use client";

import { useState } from "react";

import { useDebounce } from "@/shared/hooks";
import { useRecipesSearch } from "@/features/recipes-search/api";
import { RecipesSearchInput } from "@/features/recipes-search/ui/search-input";
import { RecipesSearchResults } from "@/features/recipes-search/ui/search-results";

export const RecipesSearchPage = () => {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 400);
    const { data, isLoading, isError, error } =
        useRecipesSearch(debouncedQuery);
    const isQueryTooShort = query.length < 2;

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Recipes Search</h1>
            <RecipesSearchInput
                onChange={setQuery}
                value={query}
            />
            <p className="text-xs text-gray-400 mt-1">
                {isQueryTooShort ? "Type at least 2 characters" : "\u00A0"}
            </p>
            <RecipesSearchResults
                error={isQueryTooShort ? null : error}
                items={isQueryTooShort ? [] : (data ?? [])}
                isError={isQueryTooShort ? false : isError}
                query={isQueryTooShort ? "" : debouncedQuery}
                isLoading={isQueryTooShort ? false : isLoading}
            />
        </div>
    );
};
