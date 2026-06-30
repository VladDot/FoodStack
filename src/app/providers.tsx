"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
    session?: Session | null;
    children: React.ReactNode;
}

export function Providers({ children, session }: ProvidersProps) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}
