import { cn } from "@/shared/utils";

import type { ButtonSize, ButtonVariant } from "./types";

type getStylesProps = {
    asChild?: boolean;
    size?: ButtonSize;
    className?: string;
    disabled?: boolean;
    isActive?: boolean;
    isLoading?: boolean;
    variant?: ButtonVariant;
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
            "inline-flex items-center justify-center rounded-lg px-5 py-2.5 font-medium transition-colors w-full",
            {
                "bg-brand-green text-white hover:bg-brand-green-hover active:bg-brand-green-active":
                    variant === "primary" && !disabled && !isLoading,
                "bg-brand-green/50 text-white/60 cursor-not-allowed":
                    variant === "primary" && disabled,

                "bg-brand-orange text-white hover:bg-brand-orange-hover active:bg-brand-orange-active":
                    variant === "cta" && !disabled && !isLoading,
                "bg-brand-orange/40 text-white/60 cursor-not-allowed":
                    variant === "cta" && disabled,

                "bg-white border border-brand-gray text-brand-dark hover:bg-neutral-100 active:bg-neutral-200":
                    variant === "outline" && !disabled && !isLoading,
                "bg-white border border-brand-gray/30 text-brand-dark/30 cursor-not-allowed":
                    variant === "outline" && disabled,

                "bg-red-400 hover:bg-red-500": variant === "danger" && !disabled,
                "opacity-50 cursor-not-allowed": variant === "danger" && disabled,

                "text-brand-dark": variant === "ghost",
            },
            {
                "px-3 py-1.5 text-sm": size === "sm",
                "px-5 py-2.5": size === "md",
                "h-10 w-10 p-0 aspect-square": size === "icon",
            },
            asChild &&
                !isActive &&
                "bg-brand-green/10 rounded-t-[30px] hover:bg-brand-green/20 data-[state=open]:bg-brand-green/20",
            className,
        ),
    };
};
