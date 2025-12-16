import createMiddleware from "next-intl/middleware";

import { locales } from "./constants";

//TODO розібратись з middleware

export default createMiddleware({
    locales,
    defaultLocale: "uk",
    localePrefix: "never",
});

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
