import { TextInput, InputWrapper } from '@/shared/ui/input';

import { useController, RegisterOptions } from 'react-hook-form';
import { Path, FieldValues, useFormContext } from 'react-hook-form';

type FormTextInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  component?: React.ElementType;
  rules?: RegisterOptions<T, Path<T>>;
} & Omit<React.ComponentProps<typeof TextInput>, 'name'>;

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
    <InputWrapper label={label} error={error?.message} required={isRequired}>
      <Component {...field} {...props} value={field.value ?? ''} invalid={!!error} />
    </InputWrapper>
  );
};
