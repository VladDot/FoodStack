import { cn } from "@/shared/utils";

interface IGetStyles {
    burger?: boolean;
    isOpen?: boolean;
    isActive?: boolean;
}

export const getStyles = ({ burger, isOpen, isActive }: IGetStyles) => ({
    link: cn(
        "relative inline-flex items-center gap-2 font-semibold tracking-wide transition-colors tablet:text-md laptop:text-xl transition-opacity duration-300 ease-in-out",
        "after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[3px] after:rounded-full after:scale-x-0 after:transition-transform after:duration-300",
        "hover:after:scale-x-100",
        isActive
            ? burger
                ? "text-white after:bg-white after:scale-x-100"
                : "text-brand-teal after:bg-brand-teal after:scale-x-100"
            : burger
              ? "text-white/80 hover:text-white after:bg-white"
              : "text-brand-forest/70 hover:text-brand-forest after:bg-brand-forest",
        {
            "opacity-100": burger && isOpen,
            "opacity-0": burger && !isOpen,
        },
    ),
});
