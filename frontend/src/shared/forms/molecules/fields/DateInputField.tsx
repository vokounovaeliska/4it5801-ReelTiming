import { format } from 'date-fns';

import { Input, type InputProps } from '@frontend/shared/design-system';

import { FormField, type FormFieldBaseProps } from '../FormField';

export type DateInputFieldProps = FormFieldBaseProps<InputProps>;

export function DateInputField({
  id,
  name,
  label,
  ...inputProps
}: DateInputFieldProps) {
  return (
    <FormField
      id={id}
      name={name}
      label={label}
      isRequired={inputProps.isRequired}
    >
      {(field) => {
        const value = field.value ? format(field.value, 'yyyy-MM-dd') : '';

        return (
          <Input
            borderWidth={1}
            borderColor={'gray.400'}
            type="date"
            {...inputProps}
            {...field}
            value={value}
            onChange={(e) => {
              const dateValue = e.target.value;
              field.onChange(dateValue ? new Date(dateValue) : null);
            }}
          />
        );
      }}
    </FormField>
  );
}
