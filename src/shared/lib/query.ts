import { useMemo } from "react";

export const useFlatPages = <T>(data?: { pages: { items: T[] }[] }) =>
    useMemo(() => data?.pages.flatMap((p) => p.items) ?? [], [data]);

export const useQueryError = (error: unknown, isError: boolean) => {
    const isLimitExceeded =
        error instanceof Error && error.message === "Request limit exceeded";
    return { isLimitExceeded, isFSRError: isError && !isLimitExceeded };
};
