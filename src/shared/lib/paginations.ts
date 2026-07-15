interface CursorPage {
    items: unknown[];
    cursor?: string | null;
}

export const getCursorNextPageParam = (
    lastPage: CursorPage,
): string | undefined => {
    if (!lastPage.items || lastPage.items.length === 0) {
        return undefined;
    }
    return lastPage.cursor ?? undefined;
};
