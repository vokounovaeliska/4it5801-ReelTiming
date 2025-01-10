import { Td } from '@chakra-ui/react';

import { currencyUtil } from '@shared/currencyUtil';

type RateCellProps = {
  value: number | undefined | null;
  currency: string;
};

export function CrewlistTableRateCell({ value, currency }: RateCellProps) {
  return (
    <Td textAlign="right">
      {value !== 0 && value !== undefined
        ? currencyUtil.formatAmount(value, currency)
        : ''}
    </Td>
  );
}
