"use client";

import { useState } from "react";

import { Portal } from "../portal";

import { getStyles } from "./styles";

interface IBurger {
    className?: string;
}

export const Burger = ({}: IBurger) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
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

            {isOpen && (
                <Portal opened={isOpen}>
                    <div className={style.burgerMenu}>
                        <div className={style.overlay} />
                    </div>
                </Portal>
            )}
        </>
    );
};
