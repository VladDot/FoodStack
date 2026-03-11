import React, { useState } from "react";

import { TextInput } from "../text-input";

export const PasswordInput = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
    const [show, setShow] = useState(false);
    return (
        <div className="relative">
            <TextInput
                {...props}
                ref={ref}
                type={show ? "text" : "password"}
            />
            <button
                type="button"
                onClick={() => setShow((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
            >
                {show ? "Hide" : "Show"}
            </button>
        </div>
    );
});

PasswordInput.displayName = "PasswordInput";
