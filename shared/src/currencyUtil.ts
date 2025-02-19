import currencyCodes from 'currency-codes';

type CurrencyCode = string;

export const DEFAULT_CURRENCY: CurrencyCode = 'CZK';

export const currencyUtil = {
  formatAmount(
    value: number | undefined | null,
    currency: CurrencyCode = DEFAULT_CURRENCY,
    minimumFractionDigits: number = 0,
  ): string {
    if (!value && value !== 0) return '';
    const formatter = new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency,
      minimumFractionDigits: minimumFractionDigits,
      maximumFractionDigits: 2,
    });
    return formatter.format(value);
  },

  formatAmountPerKM(
    value: number | undefined | null,
    currency: CurrencyCode = DEFAULT_CURRENCY,
    minimumFractionDigits: number = 0,
  ): string {
    return (
      currencyUtil.formatAmount(value, currency, minimumFractionDigits) + '/KM'
    );
  },

  getLabel(currency: CurrencyCode): string {
    const foundCurrency = currencyCodes.data.find(
      ({ code }) => code === currency,
    );
    return foundCurrency
      ? `${foundCurrency.currency} (${foundCurrency.code})`
      : currency;
  },

  getCurrencySymbol(currency: CurrencyCode): string {
    const formatter = new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency,
    });
    const formatted = formatter.format(123.45);
    const symbol = formatted.replace(/[\d.,\s]/g, '');
    return symbol;
  },
};
