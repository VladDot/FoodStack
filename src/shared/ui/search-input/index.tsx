"use client";

import { useDebouncedCallback } from "use-debounce";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { InputWrapper } from "../input";

interface SearchInputProps {
    error?: string;
    label?: string;
    paramName?: string;
    required?: boolean;
    placeholder?: string;
}

export function SearchInput({
    placeholder = "Пошук...",
    paramName = "query",
    label,
    error,
    required,
}: SearchInputProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (term) {
            params.set(paramName, term);
        } else {
            params.delete(paramName);
        }
        params.set("page", "1");
        replace(`${pathname}?${params.toString()}`);
    }, 400);

    return (
        <InputWrapper
            label={label}
            error={error}
            required={required}
        >
            <input
                type="text"
                placeholder={placeholder}
                defaultValue={searchParams.get(paramName)?.toString() || ""}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full md:w-96 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
        </InputWrapper>
    );
}
