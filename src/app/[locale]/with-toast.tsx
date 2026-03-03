"use client";

import { Toast } from "@/shared/ui";
import { ChildrenProps } from "@/shared/types";

export const WidthToast = ({ children }: ChildrenProps) => {
    return (
        <>
            {children}
            <Toast limit={5} />
        </>
    );
};
