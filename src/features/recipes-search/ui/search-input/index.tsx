"use client";

import { useTranslations } from "next-intl";

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
    const t = useTranslations("search");
    return (
        <SearchInput
            value={value}
            minLength={minLength}
            placeholder={t("recipesPlaceholder")}
            containerClassName="max-w-2xl mx-auto"
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
