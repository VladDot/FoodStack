import clsx from "clsx";

import { Locale, LANGUAGES } from "@/shared/types";

interface IGetStyles {
    activeLanguage: Locale;
}

export const getStyles = ({ activeLanguage }: IGetStyles) => ({
    wrapper:
        "group relative rounded-full h-6 flex gap-3 justify-between items-center p-[6px]  border-1 border-solid border-gray-300 cursor-pointer ",

    span: "group-hover:text-rose-500 transition-text duration-300 easy-in-out",

    iconWrapper: `absolute top-1/2 left-[2px] -translate-y-1/2 flex justify-between items-center `,

    icon: clsx("w-[22px] h-6 transition-all duration-200 ease-in-out ", {
        "transform translate-x-0": activeLanguage === LANGUAGES.uk,
        "transform translate-x-1/2": activeLanguage === LANGUAGES.en,
    }),

    ua: clsx({
        "opacity-0": activeLanguage === LANGUAGES.en,
        "opacity-100": activeLanguage === LANGUAGES.uk,
    }),
    en: clsx({
        "opacity-100": activeLanguage === LANGUAGES.en,
        "opacity-0": activeLanguage === LANGUAGES.uk,
    }),
});
