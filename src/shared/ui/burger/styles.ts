import { cn } from "@/shared/utils";

interface IGetStyles {
    isOpen: boolean;
}

export const getStyles = ({ isOpen }: IGetStyles) => ({
    burger: cn("w-5 flex flex-col gap-1"),
    span: "border-1 border-solid transparent transition-all duration-300 ease-in-out z-999",

    top: cn({ "rotate-45 translate-y-1": isOpen }),
    middle: cn({ "opacity-0": isOpen }),
    bottom: cn({ "-rotate-45 -translate-y-2": isOpen }),

    burgerMenu: cn(
        "fixed top-0 left-0 bg-linear-to-r from-lime-300 to-emerald-500 z-998 h-screen ",
        isOpen ? "animate-fade-in" : "animate-fade-out",
    ),
});
