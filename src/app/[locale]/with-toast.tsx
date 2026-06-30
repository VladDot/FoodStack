"use client";

import { Toast } from "@/shared/ui";
import { ChildrenProps } from "@/shared/types";

export const WithToast = ({ children }: ChildrenProps) => {
    return (
        <>
            {children}
            <Toast
                limit={5}
                draggable
                rtl={false}
                closeOnClick
                pauseOnHover
                autoClose={3000}
                pauseOnFocusLoss
                newestOnTop={false}
                position="top-right"
                hideProgressBar={false}
            />
        </>
    );
};
