import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/shared/utils";

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    containerClassName?: string;
};

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
    ({ containerClassName, className, ...props }, ref) => (
        <div className={cn("relative", containerClassName)}>
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray pointer-events-none" />
            <input
                {...props}
                ref={ref}
                type="text"
                className={cn(
                    "w-full pl-10 pr-4 py-3 bg-white border border-neutral-200",
                    "rounded-xl text-brand-dark placeholder-brand-gray",
                    "hover:border-brand-green transition-colors",
                    "focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green",
                    className,
                )}
            />
        </div>
    ),
);

SearchInput.displayName = "SearchInput";
