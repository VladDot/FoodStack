import React, { ReactNode, ComponentPropsWithoutRef } from "react";

import Link from "next/link";

export type ButtonSize = "sm" | "md" | "icon";
export type ButtonVariant = "primary" | "cta" | "outline" | "ghost" | "danger";
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: ButtonSize;
    isActive?: boolean;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    variant?: ButtonVariant;
};
export type LinkButtonProps = ComponentPropsWithoutRef<typeof Link> & {
    size?: ButtonSize;
    isActive?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    variant?: ButtonVariant;
};
