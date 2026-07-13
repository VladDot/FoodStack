import { useEffect } from "react";

import { showMessage } from "@/shared/ui/toastify";
import { useInfiniteFoodSearch } from "@/features/food-search/api";
import { FoodSearchResults } from "@/features/food-search/ui/search-results";

export const FoodSearchContent = ({ query }: { query: string }) => {
    const {
        data,
        error,
        isError,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteFoodSearch(query);

    const items = data?.pages.flatMap((page) => page.items) ?? [];
    const isLimitExceeded = error?.message === "Request limit exceeded";
    const isFSRError = isError && !isLimitExceeded;

    useEffect(() => {
        if (isLimitExceeded) {
            showMessage.warn("Request limit exceeded. Please try again later.");
        }
    }, [isLimitExceeded]);

    useEffect(() => {
        if (isFSRError) {
            showMessage.warn(
                error?.message ||
                    "Something went wrong while searching for food",
            );
        }
    }, [isFSRError, error]);

    return (
        <>
            {items.length > 0 && (
                <p className="text-xs text-gray-400 mt-2">
                    Showing {items.length} of {items.length} result
                    {items.length !== 1 ? "s" : ""}
                </p>
            )}
            <FoodSearchResults
                items={items}
                query={query}
                isError={isFSRError}
                isLoading={isLoading}
                onLoadMore={fetchNextPage}
                hasNextPage={!!hasNextPage}
                error={isFSRError ? error : null}
                isFetchingNextPage={isFetchingNextPage}
            />
            {!hasNextPage && items.length > 0 && (
                <p className="text-xs text-gray-400 text-center mt-2">
                    All results loaded
                </p>
            )}
        </>
    );
};
