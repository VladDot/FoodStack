import { cn } from "@/shared/utils";

interface IGetStyles {
    isOpen: boolean;
}

export const getStyles = ({ isOpen }: IGetStyles) => ({
    aside: cn(
        "fixed left-0 top-(--header-h) z-40 h-[calc(100vh-var(--header-h))] w-64 -translate-x-full shrink-0 overflow-y-auto border-r border-brand-gray/20 bg-white p-4 shadow-lg transition-transform duration-300",
        "laptop:sticky laptop:top-(--header-h) laptop:h-[calc(100vh-var(--header-h))] laptop:w-auto laptop:translate-x-0 laptop:left-auto laptop:shadow-none laptop:overflow-y-auto",
        isOpen && "translate-x-0",
    ),
    nav: "flex flex-col gap-6",
    toggle: cn(
        "fixed left-0 top-1/2 z-50 h-20 w-8 -translate-y-1/2 rounded-r-3xl rounded-l-none bg-brand-green text-white shadow-md transition-transform duration-300 laptop:hidden",
        isOpen && "translate-x-64",
    ),
});
