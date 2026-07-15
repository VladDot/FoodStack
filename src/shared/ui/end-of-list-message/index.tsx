export const EndOfListMessage = ({
    hasNextPage,
    totalCount,
}: {
    hasNextPage: boolean;
    totalCount: number;
}) => {
    if (hasNextPage || totalCount === 0) return null;

    return (
        <p className="text-xs text-gray-400 text-center mt-2">
            All results loaded
        </p>
    );
};
