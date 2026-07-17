"use client";

import { SearchInput } from "@/shared/ui/input";

interface FoodSearchInputProps {
    value: string;
    minLength?: number;
    onChange: (value: string) => void;
}

export function FoodSearchInput({
    value,
    onChange,
    minLength,
}: FoodSearchInputProps) {
    return (
        <SearchInput
            value={value}
            minLength={minLength}
            placeholder="Search food..."
            containerClassName="max-w-2xl mx-auto"
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
