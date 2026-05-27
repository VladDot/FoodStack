import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    secret: process.env.AUTH_SECRET as string,
    trustHost: true,
    session: { strategy: "jwt" },
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
