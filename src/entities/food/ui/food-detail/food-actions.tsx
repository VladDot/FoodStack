"use client";

interface FoodActionsProps {
    foodId: string;
}

export const FoodActions = ({ foodId }: FoodActionsProps) => {
    return (
        <div className="border-t border-zinc-200 pt-5">
            <div className="flex flex-col sm:flex-row gap-2">
                <button
                    type="button"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-800 text-white px-5 py-2.5 text-sm font-medium hover:bg-zinc-700 transition-colors"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    Add to Daily Log
                </button>
                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                    Save
                </button>
            </div>
        </div>
    );
};
