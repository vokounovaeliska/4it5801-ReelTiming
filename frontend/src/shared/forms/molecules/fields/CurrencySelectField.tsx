import currencyCodes from 'currency-codes';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';

import { FormField, type FormFieldBaseProps } from '../FormField';

export type CurrencySelectFieldProps = FormFieldBaseProps<{}>;

export function CurrencySelectField({
  id,
  name,
  label,
  ...selectProps
}: CurrencySelectFieldProps) {
  const { control } = useFormContext();
  const currencies = currencyCodes.data
    .map((currency) => ({
      value: currency.code,
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
      {() => (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={currencies}
              placeholder="Select currency"
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderColor: '#a0aec0',
                  borderWidth: '1px',
                  height: '40px',
                }),
                menu: (provided) => ({
                  ...provided,
                  overflowY: 'auto',
                }),
              }}
              value={currencies.find((c) => c.value === field.value)}
              onChange={(selectedOption) =>
                field.onChange(selectedOption?.value)
              }
            />
          )}
        />
      )}
    </FormField>
  );
}
