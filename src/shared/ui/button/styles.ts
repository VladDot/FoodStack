import { cn } from "@/shared/utils";

type getStylesProps = {
    asChild?: boolean;
    className?: string;
    disabled?: boolean;
    isActive?: boolean;
    isLoading?: boolean;
    size?: "sm" | "md" | "icon";
    variant?: "primary" | "ghost" | "outline" | "danger";
};

export const getStyles = ({
    isActive,
    disabled,
    isLoading,
    asChild,
    className,
    size = "md",
    variant = "primary",
}: getStylesProps) => {
    return {
        button: cn(
            "inline-flex items-center justify-center rounded-md font-medium transition-colors w-full ",
            {
                "bg-emerald-400  text-black ": variant === "primary",
                "hover:bg-emerald-500":
                    variant === "primary" && !disabled && !isLoading,
                "text-black  ": variant === "ghost",
                "border border-emerald-500 text-black ": variant === "outline",
                "bg-red-400 hover:bg-red-500": variant === "danger",

                "opacity-50 cursor-not-allowed": disabled,
            },
            {
                "h-8 px-3 text-sm": size === "sm",
                "h-10 px-4": size === "md",
                "h-10 w-10 p-0 aspect-square": size === "icon",
            },

            asChild &&
                !isActive &&
                "bg-emerald-100 text-black rounded-t-[30px] hover:bg-emerald-200 data-[state=open]:bg-emerald-200",

            className,
        ),
    };
};
