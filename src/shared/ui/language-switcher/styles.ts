import { ActiveLanguage } from "@/types";
import clsx from "clsx";

interface IGetStyles {
    activeLanguage: ActiveLanguage;
}

export const getStyles = ({ activeLanguage }: IGetStyles) => ({
    wrapper:
        "group relative rounded-full h-6 flex gap-3 justify-between items-center p-[6px]  border-1 border-solid border-gray-300 cursor-pointer ",

    span: "group-hover:text-rose-500 transition-text duration-300 easy-in-out",

    iconWrapper: `absolute top-1/2 left-[2px] -translate-y-1/2 flex justify-between items-center `,

    icon: clsx("w-[22px] h-6 transition-all duration-200 ease-in-out ", {
        "transform translate-x-0": activeLanguage === ActiveLanguage.UA,
        "transform translate-x-1/2": activeLanguage === ActiveLanguage.EN,
    }),

    ua: clsx({
        "opacity-0": activeLanguage === ActiveLanguage.EN,
        "opacity-100": activeLanguage === ActiveLanguage.UA,
    }),
    en: clsx({
        "opacity-100": activeLanguage === ActiveLanguage.EN,
        "opacity-0": activeLanguage === ActiveLanguage.UA,
    }),
});
