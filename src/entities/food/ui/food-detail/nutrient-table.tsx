import { CleanFoodDetailItem } from "../../model/types";
import { groupNutrients } from "../../model/nutrient-groups";

interface NutrientTableProps {
    food: CleanFoodDetailItem;
}

export const NutrientTable = ({ food }: NutrientTableProps) => {
    const sections = groupNutrients(food.totalNutrients)
        .map((section) => ({
            ...section,
            items: section.items.filter(
                (nutrient) => Number(nutrient.quantity.toFixed(1)) > 0,
            ),
        }))
        .filter((section) => section.items.length > 0);

    if (sections.length === 0) return null;

    return (
        <div className="mb-6">
            <p className="text-xl font-semibold text-zinc-800 mb-3 border-b border-zinc-200 pb-2">
                Full Nutrition Breakdown
            </p>
            <div className="space-y-6">
                {sections.map((section) => (
                    <div key={section.id}>
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">
                            {section.title}
                        </h3>
                        <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-100 shadow-sm overflow-hidden">
                            {section.items.map((nutrient) => (
                                <div
                                    key={nutrient.label}
                                    className="flex justify-between py-2.5 px-4 text-sm"
                                >
                                    <span className="text-slate-600">
                                        {nutrient.label}
                                    </span>
                                    <span className="font-medium text-slate-900">
                                        {nutrient.quantity
                                            .toFixed(1)
                                            .replace(/\.0$/, "")}
                                        {nutrient.unit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
