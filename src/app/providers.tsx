"use client";

import { useState } from "react";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import {
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

import { ApiError } from "@/shared/lib";
import { showMessage } from "@/shared/ui/toastify";

interface ProvidersProps {
    session?: Session | null;
    children: React.ReactNode;
}

export function Providers({ children, session }: ProvidersProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                queryCache: new QueryCache({
                    onError: (error) => {
                        if (error instanceof ApiError && error.status === 429) {
                            showMessage.warn(
                                "Request limit exceeded. Please try again later.",
                            );
                            return;
                        }

                        const message =
                            error instanceof Error
                                ? error.message
                                : "An unexpected error occurred";

                        showMessage.warn(
                            message || "Something went wrong while searching",
                        );
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
