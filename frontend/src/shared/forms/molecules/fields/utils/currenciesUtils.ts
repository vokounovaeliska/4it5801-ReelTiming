import currencyCodes from 'currency-codes';

export const currencies = currencyCodes.data
  .map((currency) => ({
    value: currency.code,
    label: `${currency.code} - ${currency.currency}`,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));
