import { roundValue } from "@/shared/utils";

import { getStyles } from "./style";

interface MacroCardsProps {
    fat: number;
    carbs: number;
    fiber?: number;
    protein: number;
    className?: string;
    wrapperClassName?: string;
}

const macros = [
    {
        label: "Protein",
        key: "protein" as const,
        unit: "g",
        accent: "border-green-400 bg-green-100",
    },
    {
        label: "Fat",
        key: "fat" as const,
        unit: "g",
        accent: "border-orange-400 bg-orange-100",
    },
    {
        label: "Carbohydrates",
        key: "carbs" as const,
        unit: "g",
        accent: "border-amber-400 bg-amber-100",
    },
    {
        label: "Fiber",
        key: "fiber" as const,
        unit: "g",
        accent: "border-emerald-400 bg-emerald-100",
    },
];

export const MacroCards = ({
    fat,
    carbs,
    fiber,
    protein,
    className,
    wrapperClassName,
}: MacroCardsProps) => {
    const rendered = macros.filter(({ key }) => {
        const value = key === "fiber" ? fiber : { protein, fat, carbs }[key];
        return value !== undefined && value !== null;
    });

    const style = getStyles({ className, wrapperClassName });

    return (
        <div className={style.wrapper}>
            {rendered.map(({ label, key, unit, accent }) => {
                const value =
                    key === "fiber" ? fiber : { protein, fat, carbs }[key];
                return (
                    <div
                        key={key}
                        className={style.item(accent)}
                    >
                        <p className="text-md uppercase tracking-wide ">
                            {label}:
                        </p>
                        <p className="text-md font-bold text-zinc-800">
                            {roundValue(value)}
                            <span className="text-sm font-medium  ml-0.5">
                                {unit}
                            </span>
                        </p>
                    </div>
                );
            })}
        </div>
    );
};
