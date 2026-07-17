export const SkeletonCard = () => (
    <div className="animate-pulse bg-neutral-100 rounded-2xl overflow-hidden">
        <div className="aspect-4/3 bg-neutral-200" />
        <div className="p-4 space-y-3">
            <div className="h-3 bg-neutral-200 rounded w-3/4" />
            <div className="h-3 bg-neutral-200 rounded w-1/4" />
            <div className="h-3 bg-neutral-200 rounded w-1/2" />
        </div>
    </div>
);
