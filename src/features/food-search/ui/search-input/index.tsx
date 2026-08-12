"use client";

import { useTranslations } from "next-intl";

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
    const t = useTranslations("search");
    return (
        <SearchInput
            value={value}
            minLength={minLength}
            placeholder={t("foodPlaceholder")}
            containerClassName="max-w-2xl mx-auto"
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
