import { Input, type InputProps } from '@frontend/shared/design-system';

import { FormField, type FormFieldBaseProps } from '../FormField';

export type SingleFileUploadFieldProps = FormFieldBaseProps<
  Omit<InputProps, 'multiple'>
>;

export function SingleFileUploadField({
  id,
  name,
  label,
  ...inputProps
}: SingleFileUploadFieldProps) {
  return (
    <FormField
      id={id}
      name={name}
      label={label}
      isRequired={inputProps.isRequired}
    >
      {({ value, onChange, ...restField }) => (
        <Input
          {...inputProps}
          {...restField}
          type="file"
          value={value?.fileName}
          onChange={(event) => onChange(event.target.files?.[0] ?? null)}
        />
      )}
    </FormField>
  );
}
