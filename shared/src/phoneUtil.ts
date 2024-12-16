import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const formatPhoneNumber = (number?: string) => {
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
