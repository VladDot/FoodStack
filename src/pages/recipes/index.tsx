"use client";

import { useState } from "react";

import { useDebounce } from "@/shared/hooks";
import { RecipesSearchInput } from "@/features/recipes-search/ui/search-input";

import { RecipesSearchContent } from "./recipes-search-content";

export const RecipesSearchPage = () => {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 600);

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
