"use client";

import React, { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

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
                className="pr-10"
            />
            <button
                type="button"
                onClick={() => setShow((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray hover:text-brand-dark transition-colors"
                tabIndex={-1}
            >
                {show ? (
                    <EyeOff className="w-5 h-5" />
                ) : (
                    <Eye className="w-5 h-5" />
                )}
            </button>
        </div>
    );
});

PasswordInput.displayName = "PasswordInput";
