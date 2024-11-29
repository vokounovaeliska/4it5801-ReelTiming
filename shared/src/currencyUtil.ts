import currencyCodes from 'currency-codes';

type CurrencyCode = string;

export const DEFAULT_CURRENCY: CurrencyCode = 'CZK';

export const currencyUtil = {
  formatAmount(
    value: number | undefined,
    currency: CurrencyCode = DEFAULT_CURRENCY,
    minimumFractionDigits: number = 0,
  ): string {
    if (!value) return '';
    const formatter = new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency,
      minimumFractionDigits: minimumFractionDigits,
      maximumFractionDigits: 2,
    });
    return formatter.format(value);
  },

  getLabel(currency: CurrencyCode): string {
    const foundCurrency = currencyCodes.data.find(
      ({ code }) => code === currency,
    );
    return foundCurrency
      ? `${foundCurrency.currency} (${foundCurrency.code})`
      : currency;
  },
};
