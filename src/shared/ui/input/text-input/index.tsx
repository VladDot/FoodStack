import React from "react";

export const TextInput = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
    <input
        {...props}
        ref={ref}
        value={props.value ?? ""}
        type={props.type || "text"}
        className="border rounded px-3 py-2 w-full"
    />
));

TextInput.displayName = "TextInput";
