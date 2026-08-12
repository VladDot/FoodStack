import { EndOfListMessage } from "@/shared/ui";
import { useFlatItems, useQueryError } from "@/shared/lib";
import { useFoodSearch } from "@/features/food-search/api";
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
    } = useFoodSearch(query);

    const items = useFlatItems(data);
    const isFSRError = useQueryError(error, isError);

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
                totalCount={items.length}
                hasNextPage={!!hasNextPage}
            />
        </>
    );
};
