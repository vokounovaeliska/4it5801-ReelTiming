import { Textarea, type TextareaProps } from '@frontend/shared/design-system';

import { FormField, type FormFieldBaseProps } from '../FormField';

export type TextAreaFieldProps = FormFieldBaseProps<TextareaProps>;

export function TextAreaField({
  id,
  name,
  label,
  ...inputProps
}: TextAreaFieldProps) {
  return (
    <FormField
      id={id}
      name={name}
      label={label}
      isRequired={inputProps.isRequired}
    >
      {(field) => (
        <Textarea
          borderColor={'gray.400'}
          borderWidth={1}
          {...inputProps}
          {...field}
        />
      )}
    </FormField>
  );
}
