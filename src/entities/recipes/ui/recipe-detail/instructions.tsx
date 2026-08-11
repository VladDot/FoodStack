import { RecipeStep } from "../../model/types";

interface InstructionsProps {
    steps: RecipeStep[];
}

export const Instructions = ({ steps }: InstructionsProps) => {
    if (steps.length === 0) return null;

    return (
        <div>
            <h2 className="text-xl font-semibold text-zinc-800 mb-3 border-b border-zinc-200 pb-2">
                Instructions
            </h2>
            <ol className="space-y-4">
                {steps.map((step) => (
                    <li
                        key={step.number}
                        className="flex gap-4 items-start"
                    >
                        <span className="shrink-0 w-8 h-8 rounded-full bg-zinc-800 text-white flex items-center justify-center text-sm font-medium">
                            {step.number}
                        </span>
                        <p className="text-sm text-zinc-700 pt-1.5">
                            {step.text}
                        </p>
                    </li>
                ))}
            </ol>
        </div>
    );
};
