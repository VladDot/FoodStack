"use client";

import { SearchInput } from "@/shared/ui/input/search-input";

interface RecipesSearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export function RecipesSearchInput({
    value,
    onChange,
}: RecipesSearchInputProps) {
    return (
        <SearchInput
            value={value}
            placeholder="Search Recipes..."
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
