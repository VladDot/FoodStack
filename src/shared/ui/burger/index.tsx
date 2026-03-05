"use client";

import { useRef, useState } from "react";

import { useOutsideClick } from "@/shared/hooks";
import { mainLinks } from "@/widgets/header/mock";

import { Navigation } from "../nav";
import { getStyles } from "./styles";
import { Overlay } from "../overlay";

export const Burger = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

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

            <Overlay isOpen={isOpen}>
                <div
                    className={style.burgerMenu}
                    ref={ref}
                >
                    <div className="h-full mt-16">
                        <div className="flex h-full border border-t-2 border-gray-300 align-center ">
                            <Navigation
                                burger={true}
                                isOpen={isOpen}
                                links={mainLinks}
                                setIsOpen={setIsOpen}
                                navClass="flex flex-col w-full text-sm -translate-y-20 [&>li>a]:text-3xl my-auto gap-y-6 "
                            />
                        </div>
                    </div>
                </div>
            </Overlay>
        </>
    );
};
