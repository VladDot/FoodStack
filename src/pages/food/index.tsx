"use client";

import { useState } from "react";

import { useDebounce } from "@/shared/hooks/use-debounce";

import { useFoodSearch } from "../../features/food-search/api";
import { FoodSearchInput } from "../../features/food-search/ui/search-input";
import { FoodSearchResults } from "../../features/food-search/ui/search-results";

export const FoodSearchPage = () => {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 400);
    const { data, isLoading, isError, error } = useFoodSearch(debouncedQuery);
    const isQueryTooShort = query.length < 2;

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Food Search</h1>
            <FoodSearchInput
                value={query}
                onChange={setQuery}
            />
            <p className="text-xs text-gray-400 mt-1">
                {isQueryTooShort ? "Type at least 2 characters" : "\u00A0"}
            </p>
            <FoodSearchResults
                error={isQueryTooShort ? null : error}
                items={isQueryTooShort ? [] : (data ?? [])}
                isError={isQueryTooShort ? false : isError}
                query={isQueryTooShort ? "" : debouncedQuery}
                isLoading={isQueryTooShort ? false : isLoading}
            />
        </div>
    );
};
