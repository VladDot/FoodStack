"use client";

import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { cookiesLocale } from "@/shared/constants";
import { Locale, LANGUAGES } from "@/shared/types";
import { EnIcon, UaIcon } from "@/shared/assets/icons";

import { getStyles } from "./styles";

export const LanguageSwitcher = () => {
    const pathname = usePathname();
    const router = useRouter();

    const currentLanguage: Locale =
        pathname.startsWith("/en") ? LANGUAGES.en : LANGUAGES.uk;

    const handleClick = () => {
        const newLanguage =
            currentLanguage === LANGUAGES.en ? LANGUAGES.uk : LANGUAGES.en;
        const newPathname = pathname.replace(/^\/(en|uk)/, `/${newLanguage}`);

        Cookies.set(cookiesLocale, newLanguage, { expires: 365 });
        router.replace(newPathname);
    };

    const style = getStyles({ activeLanguage: currentLanguage });
    return (
        <div
            className={style.wrapper}
            onClick={handleClick}
        >
            <span className={style.span}>ua</span>
            <span className={style.span}>en</span>

            <div className={style.iconWrapper}>
                <UaIcon className={`${style.icon} ${style.ua}`} />
                <EnIcon className={`${style.icon} ${style.en}`} />
            </div>
        </div>
    );
};
