import React from "react";

export const TextInput = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
    <input
        {...props}
        ref={ref}
        className="border rounded px-3 py-2 w-full"
        type="textarea"
    />
));

TextInput.displayName = "TextInput";
