import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import NextAuth, { type User, type DefaultSession } from "next-auth";

import { prisma } from "@/shared/api/prisma";

import { authConfig } from "./auth.config";

declare module "next-auth" {
  interface User {
    id?: string;
  }
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    providers: [
        ...(authConfig.providers || []),
        Credentials({
            name: "Credentials",
            async authorize(credentials): Promise<User | null> {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: String(credentials.email) },
                });

                if (!user || !user.password) return null;

                const isPasswordValid = await bcrypt.compare(
                    String(credentials.password),
                    user.password,
                );

                if (!isPasswordValid) return null;

                return {
                    id: String(user.id),
                    email: user.email,
                    name: user.name,
                };
            },
        }),
    ],
});
