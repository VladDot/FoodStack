"use client";

import { SearchInput } from "@/shared/ui/input";

interface RecipesSearchInputProps {
    value: string;
    minLength?: number;
    onChange: (value: string) => void;
}

export function RecipesSearchInput({
    value,
    onChange,
    minLength,
}: RecipesSearchInputProps) {
    return (
        <SearchInput
            value={value}
            minLength={minLength}
            placeholder="Search Recipes..."
            containerClassName="max-w-2xl mx-auto"
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
