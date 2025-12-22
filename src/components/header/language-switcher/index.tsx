import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { ActiveLanguage } from "@/types";
import { cookiesLocale } from "@/constants";
import { EnIcon, UaIcon } from "@/assets/icons";

import { getStyles } from "./styles";

export const LanguageSwitcher = () => {
    const local = useLocale();
    const router = useRouter();

    const [activeLanguage, setActiveLanguage] = useState<ActiveLanguage>(
        local as ActiveLanguage
    );

    const handleClick = () => {
        const newLanguage =
            activeLanguage === ActiveLanguage.EN
                ? ActiveLanguage.UA
                : ActiveLanguage.EN;

        setActiveLanguage(newLanguage);

        Cookies.set(cookiesLocale, newLanguage, { expires: 365 });

        router.refresh();
    };

    const style = getStyles({ activeLanguage });
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
