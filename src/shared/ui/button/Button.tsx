import React from "react";

import { Loader } from "lucide-react";

import { getStyles } from "./styles";
import { ButtonProps } from "./types";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            isActive,
            children,
            disabled,
            leftIcon,
            className,
            rightIcon,
            isLoading,
            size = "md",
            variant = "primary",
            ...props
        },
        ref,
    ) => {
        const styles = getStyles({
            size,
            variant,
            isActive,
            disabled,
            className,
            isLoading,
        });

        return (
            <button
                ref={ref}
                className={styles.button}
                disabled={disabled || isLoading}
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
            </button>
        );
    },
);

Button.displayName = "Button";
