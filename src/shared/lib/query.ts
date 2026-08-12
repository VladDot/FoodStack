import { useMemo } from "react";

import { isRateLimitError } from "./api-error";

export const useFlatItems = <T extends { id: string }>(
    data?: { pages: { items: T[] }[] },
) =>
    useMemo(() => {
        const raw = data?.pages.flatMap((p) => p.items) ?? [];
        const seen = new Set<string>();
        return raw.filter((item) => {
            if (!item.id || seen.has(item.id)) return false;
            seen.add(item.id);
            return true;
        });
    }, [data]);

export const useQueryError = (error: unknown, isError: boolean) =>
    isError && !isRateLimitError(error);
