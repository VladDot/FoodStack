interface CaloriesDisplayProps {
    calories: number;
    className?: string;
    totalWeight?: number;
}

export const CaloriesDisplay = ({
    calories,
    className,
    totalWeight,
}: CaloriesDisplayProps) => {
    return (
        <div className={`flex items-baseline gap-1.5 mt-2 ${className}`}>
            <span className="text-4xl font-bold text-zinc-800">{calories}</span>
            <span className="text-base text-zinc-400">kcal</span>
            {totalWeight && (
                <span className="text-sm text-zinc-400 ml-1">
                    / {totalWeight}g
                </span>
            )}
        </div>
    );
};
