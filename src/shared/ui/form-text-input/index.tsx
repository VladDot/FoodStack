'use client';

import { Path, FieldValues, useController, useFormContext, RegisterOptions } from "react-hook-form";

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
    const { control } = useFormContext<T>();

    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        rules,
        control,
    });

    const isRequired = Boolean(rules?.required);

    return (
        <InputWrapper
            label={label}
            required={isRequired}
            error={error?.message}
        >
            <Component
                {...field}
                {...props}
                invalid={!!error}
                value={field.value ?? ""}
            />
        </InputWrapper>
    );
};
