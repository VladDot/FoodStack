"use client";

import React from "react";

import Link from "next/link";
import { Loader } from "lucide-react";

import { getStyles } from "./styles";
import { LinkButtonProps } from "./types";

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
    (
        {
            href,
            isActive,
            children,
            leftIcon,
            className,
            isLoading,
            disabled,
            rightIcon,
            size = "md",
            variant = "primary",
            onClick,
            ...props
        },
        ref,
    ) => {
        const { button } = getStyles({
            size,
            variant,
            isActive,
            className,
            disabled,
            isLoading,
        });

        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (disabled || isLoading) {
                e.preventDefault();
                return;
            }
            onClick?.(e);
        };

        return (
            <Link
                ref={ref}
                href={href}
                className={button}
                onClick={handleClick}
                aria-disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <Loader className="size-6" />
                ) : (
                    <>
                        {leftIcon}
                        {children && <span>{children}</span>}
                        {rightIcon}
                    </>
                )}
            </Link>
        );
    },
);

LinkButton.displayName = "LinkButton";
