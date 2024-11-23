import { forwardRef } from 'react';
import { Text, TextProps } from '@chakra-ui/react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export type TextPhoneNumberProps = TextProps & {
  phoneNumber?: string;
};

export const TextPhoneNumber = forwardRef<
  HTMLSpanElement,
  TextPhoneNumberProps
>(function TextPhoneNumber({ phoneNumber, ...rest }, ref) {
  const formatPhoneNumber = (number?: string) => {
    if (!number) return '';

    try {
      const phoneNumber = parsePhoneNumberFromString(number, 'CZ');
      if (phoneNumber) {
        return phoneNumber.formatInternational();
      }
    } catch (error) {
      console.error('Error formatting phone number:', error);
    }

    return number;
  };

  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

  return (
    <Text {...rest} ref={ref}>
      {formattedPhoneNumber}
    </Text>
  );
});
