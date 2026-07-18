import React from "react";

import { getStyles } from "./style";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    invalid?: boolean;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    ({ invalid, className, ...props }, ref) => {
        const styles = getStyles({ invalid, className });

        return (
            <input
                {...props}
                ref={ref}
                className={styles.input}
                value={props.value ?? ""}
                type={props.type || "text"}
            />
        );
    },
);

TextInput.displayName = "TextInput";
