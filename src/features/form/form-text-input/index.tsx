import { FieldValues, Path } from "react-hook-form";
import { RegisterOptions, useController } from "react-hook-form";

import { InputWrapper, TextInput } from "@/shared/ui/input";

type FormTextInputProps<T extends FieldValues> = {
    name: Path<T>;
    rules?: RegisterOptions<T, Path<T>>;
} & Omit<React.ComponentProps<typeof TextInput>, "name">;

export const FormTextInput = <T extends FieldValues>({
    name,
    rules,
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
            <TextInput
                {...props}
                {...field}
            />
            {error?.message && isTouched && (
                <p className="mt-1 text-sm text-red-500">{error.message}</p>
            )}
        </InputWrapper>
    );
};
