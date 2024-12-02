import {
  CrewInfoPdf,
  StatementPdf,
} from '../timesheetReport/timesheetPdfReportTypes';

/**
 * Calculates the overtime payment amount based on the provided statement.
 * @param statement - The statement object containing overtime and rate details.
 * @returns The overtime payment amount.
 */
export const calculateOvertimeAmount = (
  statement: StatementPdf & { rate: CrewInfoPdf['rate'] },
): number => {
  let overtime = statement.claimed_overtime;
  let totalOvertimeAmount = 0;

  if (overtime > 0) {
    totalOvertimeAmount += statement.rate.overtime_hour1;
    overtime -= 1;
  }
  if (overtime > 0) {
    totalOvertimeAmount += statement.rate.overtime_hour2;
    overtime -= 1;
  }
  if (overtime > 0) {
    totalOvertimeAmount += statement.rate.overtime_hour3;
    overtime -= 1;
  }
  if (overtime > 0) {
    totalOvertimeAmount += statement.rate.overtime_hour4 * overtime;
  }

  return totalOvertimeAmount;
};

/**
 * Formats the given date into a string (HH:mm).
 * @param date - The date object to format.
 * @returns The formatted time string.
 */
export const formatStatementTime = (date: Date): string => {
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * Formats the given date into a string (HH:mm) in Czech Republic time.
 * @param date - The date object to format.
 * @returns The formatted time string.
 */
export const formatTime = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat('cs-CZ', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Prague',
  });
  return formatter.format(date);
};
/**
 * Formats the given date into a string (DD.MM.YYYY).
 * @param date - The date object to format.
 * @returns The formatted date string.
 */
export const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
  const year = date.getFullYear().toString();
  return `${day}.${month}.${year}`;
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  if (cleaned.length === 9) {
    const formatted = `+420 ${cleaned.slice(0, 3)} ${cleaned.slice(
      3,
      6,
    )} ${cleaned.slice(6, 9)}`;
    return formatted;
  } else if (cleaned.length === 12 && cleaned.startsWith('420')) {
    const formatted = `+420 ${cleaned.slice(3, 6)} ${cleaned.slice(
      6,
      9,
    )} ${cleaned.slice(9, 12)} ${cleaned.slice(12, 13)}`;
    return formatted;
  } else if (cleaned.length === 13 && cleaned.startsWith('+420')) {
    const formatted = cleaned.replace(
      /^\+420(\d{3})(\d{3})(\d{3})$/,
      '+420 $1 $2 $3',
    );
    return formatted;
  }
  // Return the original phone number if it doesn't match expected format
  return phoneNumber;
};

export const calculateKilometersOver = (
  statement: StatementPdf,
): number | null => {
  const allow = statement.kilometer_allow ?? 0;
  const kilometers = statement.kilometers ?? 0;

  if (
    statement.kilometer_allow === null ||
    statement.kilometer_allow === undefined ||
    !statement.kilometers
  )
    return null;

  if (allow >= kilometers) {
    return 0;
  } else {
    return kilometers - allow;
  }
};

export const calculateKilometerSum = (
  statement: StatementPdf,
): number | null => {
  const over = calculateKilometersOver(statement);
  const rate = statement.kilometer_rate ?? 0;

  if (over == null || !rate) return null;

  if (over === 0) {
    return 0;
  } else {
    return over * rate;
  }
};
