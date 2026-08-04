import { formatNormalizeLabel } from "@/shared/utils";

interface HealthLabelsProps {
    labels: string[];
}

export const greenTags = new Set([
    "vegan",
    "vegetarian",
    "paleo",
    "mediterranean",
    "dash",
    "low_fat",
    "low_calorie",
    "low_sugar",
    "low_sodium",
    "sugar_conscious",
    "heart_healthy",
    "high_fiber",
    "high_protein",
]);

export const HealthLabels = ({ labels }: HealthLabelsProps) => {
    return (
        <div className=" border-gray-200">
            <div className="flex flex-wrap gap-2">
                {labels.map((label) => {
                    const isGreen = greenTags.has(label.toLowerCase());

                    return (
                        isGreen && (
                            <span
                                key={label}
                                className={`px-3 py-1 text-sm rounded-full ${
                                    isGreen
                                        ? "bg-green-50 text-green-700"
                                        : "bg-gray-50 text-gray-600"
                                }`}
                            >
                                {formatNormalizeLabel(label)}
                            </span>
                        )
                    );
                })}
            </div>
        </div>
    );
};
