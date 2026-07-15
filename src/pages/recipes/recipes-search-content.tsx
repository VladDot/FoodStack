import { EndOfListMessage } from "@/shared/ui";
import { useFlatItems, useQueryError } from "@/shared/lib";
import { useRecipesSearch } from "@/features/recipes-search/api";
import { RecipesSearchResults } from "@/features/recipes-search/ui/search-results";

export const RecipesSearchContent = ({ query }: { query: string }) => {
    const {
        data,
        error,
        isError,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useRecipesSearch(query);

    const items = useFlatItems(data);
    const { isFSRError } = useQueryError(error, isError);

    return (
        <>
            <RecipesSearchResults
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
