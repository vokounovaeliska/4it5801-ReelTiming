import { type ReactNode } from 'react';
import { type ControllerRenderProps, useController } from 'react-hook-form';

import { Field, type FieldProps } from '@frontend/shared/design-system/';

type BaseProps = Pick<FieldProps, 'id' | 'label' | 'isRequired'> & {
  name: string;
  error?: string | null;
};

export type FormFieldBaseProps<TInputProps> = BaseProps &
  Omit<TInputProps, keyof BaseProps>;

export type FormFieldProps = BaseProps & {
  children: (controller: ControllerRenderProps) => ReactNode;
};

export function FormField({
  name,
  children,
  error,
  ...restProps
}: FormFieldProps) {
  const controller = useController({ name });

  const fieldError = error || controller?.fieldState?.error?.message;

  return (
    <Field error={fieldError} {...restProps}>
      {children(controller.field)}
    </Field>
  );
}
