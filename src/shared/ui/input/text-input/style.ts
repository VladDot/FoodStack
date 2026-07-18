import { cn } from "@/shared/utils";

interface IGetStyles {
    invalid?: boolean;
    className?: string;
}

export const getStyles = ({ invalid, className }: IGetStyles) => {
    return {
        input: cn(
            "w-full bg-white border rounded-xl px-4 py-2.5 text-brand-dark placeholder-brand-gray",
            "hover:border-brand-green transition-colors",
            "focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green",
            invalid
                ? "border-red-500 hover:border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-neutral-200",
            className,
        ),
    };
};
