"use client";

import { CleanRecipeItem } from "@/entities/recipes/model";
/* eslint-disable @next/next/no-img-element */
interface RecipesSearchResultsProps {
    query: string;
    isError: boolean;
    isLoading: boolean;
    error: Error | null;
    items: CleanRecipeItem[];
}
// TODO refactor SearchResults with fsd create layout for search results and move this component there
export function RecipesSearchResults({
    items,
    error,
    query,
    isError,
    isLoading,
}: RecipesSearchResultsProps) {
    if (!query) return null;

    if (isLoading) {
        return (
            <div className="mt-4 space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="border rounded p-3 h-16 animate-pulse bg-gray-100"
                    />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mt-4 p-3 border border-red-200 rounded bg-red-50 text-red-700 text-sm">
                {error?.message || "Something went wrong"}
            </div>
        );
    }

    if (query.length >= 2 && items.length === 0) {
        return (
            <div className="mt-4 text-gray-500 text-sm">
                No results for &quot;{query}&quot;
            </div>
        );
    }

    return (
        <div className="mt-4 space-y-2">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="border rounded p-3 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                >
                    {item.image ? (
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 rounded object-cover bg-gray-100"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                            No img
                        </div>
                    )}

                    <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.title}</p>
                        <p className="text-sm text-gray-500">
                            {item.calories} kcal
                        </p>
                    </div>

                    <div className="text-xs text-gray-400 text-right shrink-0">
                        <p>P {item.protein}g</p>
                        <p>F {item.fat}g</p>
                        <p>C {item.carbs}g</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
