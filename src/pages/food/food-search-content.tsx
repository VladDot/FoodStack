import { EndOfListMessage } from "@/shared/ui";
import { useFlatPages, useQueryError } from "@/shared/lib";
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

    const items = useFlatPages(data);
    const { isFSRError } = useQueryError(error, isError);

    return (
        <>
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
            <EndOfListMessage
                hasNextPage={!!hasNextPage}
                totalCount={items.length}
            />
        </>
    );
};
