import { cn } from "@/shared/utils";

interface IGetStyles {
    isOpen: boolean;
}

export const getStyles = ({ isOpen }: IGetStyles) => ({
    overlay: cn("absolute top-0 left-0 w-screen h-screen  bg-black z-997  ", {
        "animate-fade-in-opacity": isOpen,
        "animate-fade-out-opacity": !isOpen,
    }),
});
