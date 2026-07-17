"use client";

import { SearchInput } from "@/shared/ui/input/search-input";

interface FoodSearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export function FoodSearchInput({ value, onChange }: FoodSearchInputProps) {
    return (
        <SearchInput
            value={value}
            placeholder="Search food..."
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
