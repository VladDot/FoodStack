import React from "react";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    invalid?: boolean;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    ({ invalid, ...props }, ref) => (
        <input
            {...props}
            ref={ref}
            value={props.value ?? ""}
            type={props.type || "text"}
            className={
                invalid
                    ? "border border-red-500 rounded px-3 py-2 w-full"
                    : "border rounded px-3 py-2 w-full"
            }
        />
    ),
);

TextInput.displayName = "TextInput";
