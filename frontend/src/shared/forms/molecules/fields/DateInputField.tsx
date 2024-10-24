import { useState } from 'react';
import { Input, InputProps } from '@chakra-ui/react';
import { format, isValid, parse } from 'date-fns';

import { FormField, type FormFieldBaseProps } from '../FormField';

export type DateInputFieldProps = FormFieldBaseProps<InputProps>;

export function DateInputField({
  id,
  name,
  label,
  ...inputProps
}: DateInputFieldProps) {
  const [error, setError] = useState<string | null>(null);

  const validateDate = (dateValue: string) => {
    const parsedDate = parse(dateValue, 'yyyy-MM-dd', new Date());
    if (!isValid(parsedDate)) {
      setError('Invalid date. Please enter a valid date.');
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  return (
    <FormField
      id={id}
      name={name}
      label={label}
      isRequired={inputProps.isRequired}
      error={error}
    >
      {(field) => {
        const value = field.value ? format(field.value, 'yyyy-MM-dd') : '';

        return (
          <Input
            borderWidth={1}
            borderColor={error ? 'red.500' : 'gray.400'}
            type="date"
            {...inputProps}
            {...field}
            value={value}
            onChange={(e) => {
              const dateValue = e.target.value;
              if (validateDate(dateValue)) {
                field.onChange(dateValue ? new Date(dateValue) : null);
              } else {
                field.onChange(null);
              }
            }}
            onBlur={(e) => {
              const dateValue = e.target.value;
              validateDate(dateValue);
            }}
          />
        );
      }}
    </FormField>
  );
}
