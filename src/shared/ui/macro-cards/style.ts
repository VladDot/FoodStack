import { cn } from "@/shared/utils";

interface IGetStyles {
    className?: string;
    wrapperClassName?: string;
}

export const getStyles = ({ className, wrapperClassName }: IGetStyles) => {
    return {
        wrapper: cn("flex flex-wrap justify-around gap-2 w-full", wrapperClassName),
        item: (accent: string) =>
            cn(
                "min-w-[120px] w-fit rounded-2xl border-2 shadow-sm px-4 py-2 flex gap-2 justify-center items-center",
                accent,
                className,
            ),
    };
};
