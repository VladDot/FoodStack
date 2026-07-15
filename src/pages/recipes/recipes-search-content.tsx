import { useMemo, useState, useEffect } from "react";

import { showMessage } from "@/shared/ui/toastify";
import { useRecipesSearch } from "@/features/recipes-search/api";
import { RecipesSearchResults } from "@/features/recipes-search/ui/search-results";

const STEP = 20;

const PREFETCH_THRESHOLD = 20;

export const RecipesSearchContent = ({ query }: { query: string }) => {
    const [displayCount, setDisplayCount] = useState(STEP);

    const {
        data,
        error,
        isError,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useRecipesSearch(query);

    const allItems = useMemo(
        () => data?.pages.flatMap((page) => page.items) ?? [],
        [data],
    );

    const visibleItems = useMemo(
        () => allItems.slice(0, displayCount),
        [allItems, displayCount],
    );

    const hasMore = displayCount < allItems.length || !!hasNextPage;

    const loadMore = () => {
        const nextCount = displayCount + STEP;
        setDisplayCount(nextCount);

        if (nextCount + PREFETCH_THRESHOLD >= allItems.length && hasNextPage) {
            fetchNextPage();
        }
    };

    const isLimitExceeded = error?.message === "Request limit exceeded";
    const isFSRError = isError && !isLimitExceeded;
    //TODO обдумати і реалізувати глобальну обробку через QueryCache помилок
    useEffect(() => {
        if (isLimitExceeded) {
            showMessage.warn("Request limit exceeded. Please try again later.");
        }
    }, [isLimitExceeded]);

    useEffect(() => {
        if (isFSRError) {
            showMessage.warn(
                error?.message ||
                    "Something went wrong while searching for recipes",
            );
        }
    }, [isFSRError, error]);

    return (
        <>
            {allItems.length > 0 && (
                <p className="text-xs text-gray-400 mt-2">
                    Showing
                    {displayCount > allItems.length
                        ? allItems.length
                        : displayCount}{" "}
                    of {allItems.length} result
                    {allItems.length !== 1 ? "s" : ""}
                </p>
            )}
            <RecipesSearchResults
                items={visibleItems}
                query={query}
                isError={isFSRError}
                isLoading={isLoading}
                onLoadMore={loadMore}
                hasNextPage={hasMore}
                error={isFSRError ? error : null}
                isFetchingNextPage={isFetchingNextPage}
            />
            {!hasNextPage && allItems.length > 0 && (
                <p className="text-xs text-gray-400 text-center mt-2">
                    All results loaded
                </p>
            )}
        </>
    );
};
