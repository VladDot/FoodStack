import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

import { locales } from "./shared/constants";
import { Locale, LANGUAGES } from "./shared/types";

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale;
    const supportedLocale = locales.includes(locale as Locale)
        ? locale
        : LANGUAGES.uk;

    if (!supportedLocale) {
        notFound();
    }

    return {
        locale: supportedLocale,
        messages: (await import(`./messages/${supportedLocale}.json`)).default,
    };
});
