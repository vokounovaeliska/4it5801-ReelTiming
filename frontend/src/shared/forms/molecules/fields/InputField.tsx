import { Input, type InputProps } from '@frontend/shared/design-system';

import { FormField, type FormFieldBaseProps } from '../FormField';

export type InputFieldProps = FormFieldBaseProps<InputProps>;

export function InputField({
  id,
  name,
  label,
  ...inputProps
}: InputFieldProps) {
  return (
    <FormField
      id={id}
      name={name}
      label={label}
      isRequired={inputProps.isRequired}
    >
      {(field) => <Input {...inputProps} {...field} />}
    </FormField>
  );
}
