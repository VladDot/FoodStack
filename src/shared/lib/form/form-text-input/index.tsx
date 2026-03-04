import { Path, FieldValues } from "react-hook-form";
import { useController, RegisterOptions } from "react-hook-form";

import { TextInput, InputWrapper } from "@/shared/ui/input";

type FormTextInputProps<T extends FieldValues> = {
    label: string;
    name: Path<T>;
    component?: React.ElementType;
    rules?: RegisterOptions<T, Path<T>>;
} & Omit<React.ComponentProps<typeof TextInput>, "name">;

export const FormTextInput = <T extends FieldValues>({
    name,
    rules,
    label,
    component: Component = TextInput,
    ...props
}: FormTextInputProps<T>) => {
    const {
        field,
        fieldState: { error, isTouched },
    } = useController({
        name,
        rules,
    });

    return (
        <InputWrapper>
            <label>{label}</label>
            <Component
                {...field}
                {...props}
                value={field.value ?? ""}
            />
            {error?.message && isTouched && (
                <p className="mt-1 text-sm text-red-500">{error.message}</p>
            )}
        </InputWrapper>
    );
};
