import React, { ReactNode } from "react";

export type ButtonSize = "sm" | "md" | "icon";
export type ButtonVariant = "primary" | "ghost" | "outline" | "danger";
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: ButtonSize;
    asChild?: boolean;
    isActive?: boolean;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    variant?: ButtonVariant;
};
