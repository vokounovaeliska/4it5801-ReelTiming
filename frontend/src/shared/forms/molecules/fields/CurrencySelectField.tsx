import currencyCodes from 'currency-codes';

import { Select, type SelectProps } from '@frontend/shared/design-system';

import { FormField, type FormFieldBaseProps } from '../FormField';

export type CurrencySelectFieldProps = FormFieldBaseProps<SelectProps>;

export function CurrencySelectField({
  id,
  name,
  label,
  ...selectProps
}: CurrencySelectFieldProps) {
  const currencies = currencyCodes.data
    .map((currency) => ({
      code: currency.code,
      label: `${currency.code} - ${currency.currency}`,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <FormField
      id={id}
      name={name}
      label={label}
      isRequired={selectProps.isRequired}
    >
      {(field) => (
        <Select
          borderColor="gray.400"
          borderWidth={1}
          placeholder="Select currency"
          {...selectProps}
          {...field}
          filterOption={(
            inputValue: string,
            option: { label: string; value: string },
          ) =>
            option?.label.toLowerCase().includes(inputValue.toLowerCase()) ||
            option?.value.toLowerCase().includes(inputValue.toLowerCase())
          }
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.label}
            </option>
          ))}
        </Select>
      )}
    </FormField>
  );
}
