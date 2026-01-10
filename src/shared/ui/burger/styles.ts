import clsx from "clsx";

interface IGetStyles {
    isOpen: boolean;
}

export const getStyles = ({ isOpen }: IGetStyles) => ({
    burger: clsx("w-5 flex flex-col gap-1"),
    span: "border-1 border-solid transparent transition-all duration-300 ease-in-out z-999",

    top: clsx({ "rotate-45 translate-y-1": isOpen }),
    middle: clsx({ "opacity-0": isOpen }),
    bottom: clsx({ "-rotate-45 -translate-y-2": isOpen }),

    burgerMenu: clsx(
        "fixed w-screen h-screen top-0 left-0 bg-gray-600 z-998 transition-transform duration-300 ease-in-out ",
        isOpen ? "translate-x-0" : "-translate-x-full"
    ),

    overlay: "absolute w-full h-full bg-black opacity-50",
});
