import { Text } from '@chakra-ui/react';

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
        <Checkbox
          borderColor={'gray.300'}
          {...restProps}
          {...restField}
          isChecked={value}
        >
          <Text fontSize={{ base: 'sm', md: 'md' }} display="inline">
            {label}
          </Text>
        </Checkbox>
      )}
    </FormField>
  );
}
