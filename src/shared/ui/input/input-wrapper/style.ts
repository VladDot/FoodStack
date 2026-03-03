import { cn } from "@/shared/utils";

interface IGetStyles {
    required?: boolean;
}

export const getStyles = ({ required }: IGetStyles) => {
    return {
        inputWrapper: cn("flex flex-col gap-1", {}),
    };
};
