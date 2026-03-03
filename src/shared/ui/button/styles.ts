import { cn } from "@/shared/utils";

type getStylesProps = {
    isActive?: boolean;
    variant?: "primary" | "ghost" | "outline";
    size?: "sm" | "md";
    className?: string;
};

export const getStyles = ({
    isActive,
    className,
    size = "md",
    variant = "primary",
}: getStylesProps) => {
    return {
        button: cn(
            "inline-flex items-center justify-center rounded-md font-medium transition-colors w-full",
            {
                "bg-emerald-500 text-black ": variant === "primary",
                "text-black  ": variant === "ghost",
                "border border-emerald-500 text-black ": variant === "outline",

                "h-8 px-3 text-sm": size === "sm",
                "h-10 px-4": size === "md",

                " text-black ": isActive,
                "bg-emerald-100 text-black rounded-t-[30px] ": !isActive,
            },
            className,
        ),
    };
};
