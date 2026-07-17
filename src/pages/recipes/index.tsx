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
        <div className="p-4 w-full max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Recipes Search</h1>

            <RecipesSearchInput
                value={query}
                onChange={setQuery}
            />

            <p className="text-xs text-brand-gray mt-1">
                {isQueryTooShort ? "Type at least 2 characters" : "\u00A0"}
            </p>

            {!isQueryTooShort && (
                <RecipesSearchContent
                    key={debouncedQuery}
                    query={debouncedQuery}
                />
            )}
        </div>
    );
};
