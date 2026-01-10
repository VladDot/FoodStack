"use client";
import { ChildrenProps } from "@/types";
import { createPortal } from "react-dom";

interface IPortalProps {
    opened: boolean;
}

export const Portal = ({ children, opened }: ChildrenProps<IPortalProps>) => {
    if (!opened) {
        return null;
    }

    return createPortal(children, document.body);
};
