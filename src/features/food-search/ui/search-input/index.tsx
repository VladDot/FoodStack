"use client";

import { TextInput } from "@/shared/ui/input/text-input";

interface FoodSearchInputProps {
    value: string;
    onChange: (value: string) => void;
}
//TODO refactor SearchInput with fsd
export function FoodSearchInput({ value, onChange }: FoodSearchInputProps) {
    return (
        <TextInput
            value={value}
            placeholder="Search food..."
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
