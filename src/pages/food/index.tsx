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
        <div className="p-4 mx-auto">
            <h1 className="text-2xl font-bold mb-4 max-w-2xl mx-auto">
                Food Search
            </h1>

            <FoodSearchInput
                value={query}
                minLength={2}
                onChange={setQuery}
            />

            {!isQueryTooShort && (
                <FoodSearchContent
                    key={debouncedQuery}
                    query={debouncedQuery}
                />
            )}
        </div>
    );
};
