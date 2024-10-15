import { type ReactNode } from 'react';

import { FormControl, FormErrorMessage, FormLabel } from '../atoms';

export type FieldProps = {
  id?: string;
  label?: ReactNode;
  isRequired?: boolean;
  error?: string;
  children: ReactNode;
};

export function Field({ id, label, isRequired, error, children }: FieldProps) {
  return (
    <FormControl id={id} isRequired={isRequired} isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      {children}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
