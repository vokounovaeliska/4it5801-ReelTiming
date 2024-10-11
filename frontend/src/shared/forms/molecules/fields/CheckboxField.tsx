import { Checkbox, type CheckboxProps } from '@frontend/shared/design-system';

import { FormField, type FormFieldBaseProps } from '../FormField';

export type CheckboxFieldProps = FormFieldBaseProps<CheckboxProps>;

export function CheckboxField({
  id,
  name,
  label,
  ...restProps
}: CheckboxFieldProps) {
  return (
    <FormField id={id} name={name}>
      {({ value, ...restField }) => (
        <Checkbox {...restProps} {...restField} isChecked={value}>
          {label}
        </Checkbox>
      )}
    </FormField>
  );
}
