import { cn } from "@/shared/utils";
interface GetStylesProps {
    isActive: boolean;
}

export const getStyles = ({ isActive }: GetStylesProps) => {
    return {
        button: cn("w-1/2 text-center transition-colors duration-200", {
            "border border-b-2 text-brand-teal font-medium": isActive,
        }),
    };
};
