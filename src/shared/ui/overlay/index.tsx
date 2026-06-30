"use client";

import { useRef } from "react";

import { useMounted } from "@/shared/hooks";

import { Portal } from "../portal";
import { getStyles } from "./style";

interface IOverlay {
    isOpen: boolean;
    children?: React.ReactNode;
}

export const Overlay = ({ isOpen, children }: IOverlay) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const { isUnmounted } = useMounted({ isOpened: isOpen, duration: 300 });

    const style = getStyles({ isOpen });

    return (
        <Portal opened={isUnmounted}>
            <div
                ref={modalRef}
                className={style.overlay}
            >
                {children}
            </div>
        </Portal>
    );
};
