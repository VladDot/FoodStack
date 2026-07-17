import React from "react";

import { Search } from "lucide-react";

import { cn } from "@/shared/utils";

import { TextInput } from "../text-input";

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    minLength?: number;
    containerClassName?: string;
};

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
    ({ containerClassName, className, minLength, value, ...props }, ref) => {
        const isTooShort = minLength
            ? String(value ?? "").length < minLength
            : false;

        return (
            <div className={cn("flex flex-col gap-3", containerClassName)}>
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray pointer-events-none" />
                    <TextInput
                        {...props}
                        ref={ref}
                        value={value}
                        className={cn("pl-10 py-3", className)}
                    />
                </div>

                {minLength && isTooShort && (
                    <p className="text-xs text-brand-gray mt-1">
                        Type at least {minLength} characters
                    </p>
                )}
            </div>
        );
    },
);

SearchInput.displayName = "SearchInput";
