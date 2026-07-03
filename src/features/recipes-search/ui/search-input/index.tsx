"use client";

import { TextInput } from "@/shared/ui/input/text-input";

interface RecipesSearchInputProps {
    value: string;
    onChange: (value: string) => void;
}
//TODO refactor SearchInput with fsd
export function RecipesSearchInput({
    value,
    onChange,
}: RecipesSearchInputProps) {
    return (
        <TextInput
            value={value}
            placeholder="Search Recipes..."
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
