import React from "react";
import clsx from "clsx";

import { ButtonProps } from "./types";

import { getStyles } from "./styles";
import { cn } from "@/shared/utils";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            isActive,
            children,
            className,
            size = "md",
            asChild = false,
            variant = "primary",
            ...props
        },
        ref,
    ) => {
        const styles = getStyles({ isActive, variant, size });

        if (asChild) {
            const child = React.Children.only(children) as React.ReactElement<{
                className?: string;
            }>;

            return React.cloneElement(child, {
                className: cn(styles.button, child.props.className, className),
            });
        }

        return (
            <button
                ref={ref}
                className={styles.button}
                {...props}
            />
        );
    },
);

Button.displayName = "Button";
