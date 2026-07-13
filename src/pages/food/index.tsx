"use client";

import { useState } from "react";

import { useDebounce } from "@/shared/hooks/use-debounce";

import { FoodSearchContent } from "./food-search-content";
import { FoodSearchInput } from "../../features/food-search/ui/search-input";

export const FoodSearchPage = () => {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 400);

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

            {!isQueryTooShort && (
                <FoodSearchContent
                    key={debouncedQuery}
                    query={debouncedQuery}
                />
            )}
        </div>
    );
};
