import { Box, Switch, type SwitchProps, Text } from '@chakra-ui/react';

import { FormField, FormFieldBaseProps } from './FormField';

export type SwitchFieldProps = FormFieldBaseProps<SwitchProps> & {
  label?: string;
  onLabel?: string; // Optional label when the switch is ON
  offLabel?: string; // Optional label when the switch is OFF
};

export function SwitchField({
  id,
  name,
  label,
  onLabel = 'On',
  offLabel = 'Off',
  ...switchProps
}: SwitchFieldProps) {
  return (
    <FormField
      id={id}
      name={name}
      label={label}
      isRequired={switchProps.isRequired}
    >
      {(field) => (
        <Box display="flex" alignItems="center" gap={3}>
          <Switch
            colorScheme="orange"
            size="lg"
            isChecked={field.value}
            {...switchProps}
            {...field}
          />
          <Text fontSize="md">{field.value ? onLabel : offLabel}</Text>
        </Box>
      )}
    </FormField>
  );
}
