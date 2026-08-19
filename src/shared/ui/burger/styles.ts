import { cn } from "@/shared/utils";

interface IGetStyles {
    isOpen: boolean;
}

export const getStyles = ({ isOpen }: IGetStyles) => ({
    burger: cn("w-5 flex flex-col gap-1"),
    span: "border-1 border-solid border-brand-dark transition-all duration-300 ease-in-out z-999",

    top: cn({ "rotate-45 translate-y-1": isOpen }),
    middle: cn({ "opacity-0": isOpen }),
    bottom: cn({ "-rotate-45 -translate-y-2": isOpen }),

    burgerMenu: cn(
        "fixed top-0 left-0 z-998 h-screen overflow-hidden bg-brand-green max-w-[100vw]",
        isOpen ? "animate-fade-in" : "animate-fade-out",
    ),
});
