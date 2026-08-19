"use client";

import { useRef, useState } from "react";

import { LinkItem } from "@/shared/types";
import { useOutsideClick } from "@/shared/hooks";
import { mainLinks } from "@/widgets/header/mock";

import { Navigation } from "../nav";
import { getStyles } from "./styles";
import { Overlay } from "../overlay";

interface BurgerProps {
    links?: LinkItem[];
}

export const Burger = ({ links = mainLinks }: BurgerProps) => {
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
                        <div className="flex h-full border border-t-2 border-brand-gray/30 align-center ">
                            <Navigation
                                links={links}
                                burger={true}
                                isOpen={isOpen}
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
