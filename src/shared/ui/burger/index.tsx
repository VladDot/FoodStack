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
                        <div className="h-full mt-16">
                            <div className="flex h-full border border-t-2 border-gray-300 align-center ">
                                <Navigation
                                    links={mainLinks}
                                    burger={true}
                                    navClass="flex flex-col w-full text-sm -translate-y-20 [&>li>a]:text-3xl my-auto gap-y-6 "
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                />
                            </div>
                        </div>
                    </div>
                </Portal>
            )}
        </>
    );
};
