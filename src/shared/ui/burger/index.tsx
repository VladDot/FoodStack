"use client";

import { useRef, useState } from "react";

import { mainLinks } from "@/widgets/header/mock";
import { useMounted, useOutsideClick } from "@/shared/hooks";

import { Portal } from "../portal";
import { Navigation } from "../nav";

import { getStyles } from "./styles";

export const Burger = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
                        <div className="mt-16 h-full">
                            <div className="border border-t-2 border-gray-300 h-full flex align-center">
                                <Navigation
                                    burger={true}
                                    isOpen={isOpen}
                                    links={mainLinks}
                                    setIsOpen={setIsOpen}
                                    navClass="flex flex-col gap-y-6 w-full my-auto [&>li>a]:text-3xl text-sm -translate-y-20"
                                />
                            </div>
                        </div>
                    </div>
                </Portal>
            )}
        </>
    );
};
