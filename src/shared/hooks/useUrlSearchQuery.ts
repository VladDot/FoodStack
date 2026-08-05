import { useState, useEffect } from "react";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { useDebounce } from "./use-debounce";

export const useUrlSearchQuery = (delay = 400) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const urlQuery = searchParams?.get("query") ?? "";
    const [query, setQuery] = useState(urlQuery);

    const debouncedQuery = useDebounce(query, delay);

    useEffect(() => {
        setQuery(urlQuery);
    }, [urlQuery]);

    useEffect(() => {
        if (!pathname || !searchParams) return;

        const params = new URLSearchParams(searchParams.toString());
        const currentQuery = params.get("query") ?? "";

        if (debouncedQuery === currentQuery) return;

        if (debouncedQuery) {
            params.set("query", debouncedQuery);
        } else {
            params.delete("query");
        }

        const queryString = params.toString();
        const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

        router.replace(newUrl, { scroll: false });
    }, [debouncedQuery, pathname, router, searchParams]);

    return { query, setQuery, debouncedQuery };
};
