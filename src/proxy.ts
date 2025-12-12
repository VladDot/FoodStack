import createMiddleware from "next-intl/middleware";

import { locales } from "./constants";

export default createMiddleware({
    locales: locales,
    defaultLocale: "uk",
});

export const config = {
    matcher: ["/((?!_next|.*\\..*).*)"],
};
