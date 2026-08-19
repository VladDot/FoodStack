import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { routes } from "@/shared/constants";
import { authConfig } from "@/shared/lib/auth.config";

import { locales } from "./shared/constants";

const { auth } = NextAuth(authConfig);

const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale: "uk",
    localePrefix: "always",
});

function stripLocale(pathname: string): string {
    for (const locale of locales) {
        const prefix = `/${locale}`;
        if (pathname === prefix) return "/";
        if (pathname.startsWith(`${prefix}/`))
            return pathname.slice(prefix.length);
    }
    return pathname;
}

function getLocale(pathname: string): string {
    for (const locale of locales) {
        const prefix = `/${locale}`;
        if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
            return locale;
        }
    }
    return locales[0];
}

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const pathname = stripLocale(nextUrl.pathname);

    const publicRoutes = [routes.auth.signIn, routes.auth.signUp, "/"];

    const isPublicRoute = publicRoutes.some((route) =>
        pathname.startsWith(route),
    );

    if (!isLoggedIn && !isPublicRoute) {
        const redirectUrl = new URL(
            `${routes.auth.signIn}?callbackUrl=${encodeURIComponent(nextUrl.pathname)}`,
            nextUrl.origin,
        );
        return NextResponse.redirect(redirectUrl);
    }

    if (
        isLoggedIn &&
        (pathname.startsWith(routes.auth.signIn) ||
            pathname.startsWith(routes.auth.signUp))
    ) {
        const locale = getLocale(nextUrl.pathname);
        return NextResponse.redirect(
            new URL(
                `/${locale}${routes.user.dashboard.main}`,
                nextUrl.origin,
            ),
        );
    }

    return intlMiddleware(req);
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
