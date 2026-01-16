import { cn } from "@/shared/utils";

interface IGetStyles {
    burger?: boolean;
    isOpen?: boolean;
}

export const getStyles = ({ burger, isOpen }: IGetStyles) => ({
    link: cn(
        "text-white hover:text-rose-500 tablet:text-md laptop:text-xl transition-opacity duration-300 ease-in-out",
        {
            "opacity-100": burger && isOpen,
            "opacity-0": burger && !isOpen,
        }
    ),
});
