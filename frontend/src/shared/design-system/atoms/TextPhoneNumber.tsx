import { forwardRef } from 'react';
import { Text, TextProps } from '@chakra-ui/react';

export type TextPhoneNumberProps = TextProps & {
  phoneNumber?: string; // Ensure 'string' (lowercase) type
};

export const TextPhoneNumber = forwardRef<
  HTMLSpanElement,
  TextPhoneNumberProps
>(function TextPhoneNumber({ phoneNumber, ...rest }, ref) {
  const formatCzechPhoneNumber = (number?: string) => {
    if (!number) return '';

    const cleanedNumber = number.replace(/\D/g, '');

    if (cleanedNumber.length === 9) {
      return cleanedNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    } else if (cleanedNumber.length === 12 && cleanedNumber.startsWith('420')) {
      return cleanedNumber.replace(
        /^(420)(\d{3})(\d{3})(\d{3})$/,
        '+420 $2 $3 $4',
      );
    } else if (
      cleanedNumber.length === 13 &&
      cleanedNumber.startsWith('+420')
    ) {
      return cleanedNumber.replace(
        /^\+420(\d{3})(\d{3})(\d{3})$/,
        '+420 $1 $2 $3',
      );
    }

    return number;
  };

  const formattedPhoneNumber = formatCzechPhoneNumber(phoneNumber);

  return (
    <Text {...rest} ref={ref}>
      {formattedPhoneNumber}
    </Text>
  );
});
