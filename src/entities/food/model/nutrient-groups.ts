import { NUTRIENT_KEY_GROUPS, NUTRIENT_GROUP_ORDER, NUTRIENT_GROUP_TITLES } from "./config";
import { NutrientInfo, GroupedNutrient, NutrientGroupId, NutrientGroupSection } from "./types";

function getGroupId(key: string): NutrientGroupId {
    return NUTRIENT_KEY_GROUPS[key] ?? "other";
}

export const groupNutrients = (
    nutrients: Record<string, NutrientInfo> | undefined,
): NutrientGroupSection[] => {
    if (!nutrients) return [];

    const sections = new Map<NutrientGroupId, GroupedNutrient[]>();

    for (const [key, nutrient] of Object.entries(nutrients)) {
        if (!nutrient || typeof nutrient.quantity !== "number") continue;
        if (nutrient.quantity === 0) continue;

        const groupId = getGroupId(key);
        const items = sections.get(groupId) ?? [];
        items.push({
            label: nutrient.label,
            quantity: nutrient.quantity,
            unit: nutrient.unit,
        });
        sections.set(groupId, items);
    }

    return NUTRIENT_GROUP_ORDER.flatMap((id) => {
        const items = sections.get(id);
        if (!items || items.length === 0) return [];

        return [
            {
                id,
                title: NUTRIENT_GROUP_TITLES[id],
                items,
            },
        ];
    });
}
