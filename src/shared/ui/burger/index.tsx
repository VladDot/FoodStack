"use client";

import { useRef, useState } from "react";

import { Portal } from "../portal";

import { getStyles } from "./styles";
import { useMounted, useOutsideClick } from "@/shared/hooks";

interface IBurger {
    className?: string;
    children?: React.ReactNode;
}

export const Burger = ({ children, className }: IBurger) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    const { isUnmounted } = useMounted({ isOpened: isOpen, duration: 300 });

    useOutsideClick(() => setIsOpen(false), ref);

    const handleClick = () => {
        setIsOpen((prev) => !prev);
    };

    const style = getStyles({ isOpen });

    return (
        <>
            <button
                className={style.burger}
                onClick={handleClick}
            >
                <span className={`${style.span} ${style.top}`}></span>
                <span className={`${style.span} ${style.middle}`}></span>
                <span className={`${style.span} ${style.bottom}`}></span>
            </button>

            {isUnmounted && (
                <Portal opened={isUnmounted}>
                    <div className={style.overlay} />
                    <div
                        className={style.burgerMenu}
                        ref={ref}
                    >
                        <div className="mt-16 h-full ">{children}</div>
                    </div>
                </Portal>
            )}
        </>
    );
};
