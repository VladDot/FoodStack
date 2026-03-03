import React from "react";

export type ButtonSize = "sm" | "md";

export type ButtonVariant = "primary" | "ghost" | "outline";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: ButtonSize;
    asChild?: boolean;
    variant?: ButtonVariant;
    isActive?: boolean;
};
