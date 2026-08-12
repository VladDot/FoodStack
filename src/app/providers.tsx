"use client";

import { useState } from "react";

import { Session } from "next-auth";
import { useTranslations } from "next-intl";
import { SessionProvider } from "next-auth/react";
import {
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

import { isRateLimitError } from "@/shared/lib";
import { showMessage } from "@/shared/ui/toastify";

interface ProvidersProps {
    session?: Session | null;
    children: React.ReactNode;
}

export function Providers({ children, session }: ProvidersProps) {
    const t = useTranslations("toast");

    const [queryClient] = useState(
        () =>
            new QueryClient({
                queryCache: new QueryCache({
                    onError: (error, query) => {
                        if (isRateLimitError(error)) {
                            const key = query?.queryKey?.[0];
                            showMessage.warn(
                                key === "food-search"
                                    ? t("foodRateLimit")
                                    : t("rateLimit"),
                            );
                            return;
                        }

                        showMessage.warn(t("unexpected"));
                    },
                }),
                defaultOptions: {
                    queries: {
                        retry: 1,
                        gcTime: 30 * 60 * 1000,
                        staleTime: 5 * 60 * 1000,
                        refetchOnWindowFocus: false,
                    },
                },
            }),
    );

    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SessionProvider>
    );
}
