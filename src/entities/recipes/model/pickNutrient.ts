import { roundValue } from "@/shared/utils";

interface NutrientLike {
    name: string;
    amount: number;
}

export function pickNutrient(
    nutrients: NutrientLike[],
    name: string,
): number {
    return roundValue(
        nutrients.find((n) => n.name.toLowerCase() === name.toLowerCase())
            ?.amount ?? 0,
    );
}