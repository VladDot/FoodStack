"use client";

import { ErrorState } from "@/shared/ui/page-states";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return <ErrorState error={error} reset={reset} />;
}