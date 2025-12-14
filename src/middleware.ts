import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales, routes } from "./constants";
//TODOрозібратись з middleware
const intlMiddleware = createMiddleware({
    locales,
    defaultLocale: "uk",
    localePrefix: "never",
});

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();

    const pathSegments = url.pathname.split("/").filter(Boolean); // ['uk', 'premium']
    const locale = pathSegments[0] || "uk";
    const page = pathSegments[1] || "";

    const userRole = request.cookies.get("role")?.value; // "user" | "premium" | undefined

    // Захист user сторінок
    if (page === "user" && !userRole) {
        url.pathname = `/${locale}${routes.general.login}`;
        return NextResponse.redirect(url);
    }

    // Захист premium сторінок
    if (page === "premium" && userRole !== "premium") {
        url.pathname = `/${locale}/premium-subscription`; // нова сторінка для не преміум
        return NextResponse.redirect(url);
    }

    // Локалізація
    return intlMiddleware(request);
}

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
