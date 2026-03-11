import { cn } from "@/shared/utils";

interface IGetStyles {
    error?: string;
}

export const getStyles = ({ error }: IGetStyles) => {
    return {
        inputWrapper: cn("flex flex-col gap-1"),
        labelStyles: cn("mb-1 font-medium ", {
            "text-red-500": error,
        }),
    };
};
