export function LoadingState({
    label,
}: {
    label?: string;
}) {
    return (
        <div
            role="status"
            aria-busy="true"
            aria-label={label}
            className="max-w-4xl mx-auto px-4 py-8"
        >
            <div className="h-10 w-[200px] mb-4 bg-neutral-100 rounded-lg animate-pulse" />
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-zinc-200 animate-pulse">
                <div className="flex gap-6">
                    <div className="size-40 shrink-0 bg-neutral-200 rounded-2xl" />
                    <div className="flex-1 space-y-3">
                        <div className="h-6 bg-neutral-200 rounded w-3/4" />
                        <div className="h-4 bg-neutral-100 rounded w-1/2" />
                        <div className="h-4 bg-neutral-100 rounded w-1/3" />
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="h-20 bg-neutral-100 rounded-xl" />
                    <div className="h-20 bg-neutral-100 rounded-xl" />
                    <div className="h-20 bg-neutral-100 rounded-xl" />
                </div>
                <div className="mt-6 space-y-3">
                    <div className="h-4 bg-neutral-200 rounded w-1/4" />
                    <div className="h-3 bg-neutral-100 rounded w-full" />
                    <div className="h-3 bg-neutral-100 rounded w-5/6" />
                    <div className="h-3 bg-neutral-100 rounded w-2/3" />
                </div>
            </div>
        </div>
    );
}