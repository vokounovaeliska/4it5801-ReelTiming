export const toLocalISOString = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date object');
  }

  const pad = (num: number): string => String(num).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  const tzOffset = -date.getTimezoneOffset();
  const sign = tzOffset >= 0 ? '+' : '-';
  const offsetHours = pad(Math.floor(Math.abs(tzOffset) / 60));
  const offsetMinutes = pad(Math.abs(tzOffset) % 60);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${sign}${offsetHours}:${offsetMinutes}`;
};

export const formatTimeForDisplay = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':');
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};

export const formatTimeForDatabase = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':');
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
};

export const formatTimeForParsing = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':');
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
};

// TODO - figure out a way to change from GB to CZ without breaking the rest of format for date
// formatTime and formatDate are only used in TimesheetsForm.tsx for now
export const formatTime = (timeString: string) => {
  if (!timeString) {
    return '';
  }

  let timePart;
  if (timeString.includes('T')) {
    timePart = timeString.split('T')[1].split('.')[0]; // extract time
  } else {
    timePart = timeString;
  }

  const date = new Date(`1970-01-01T${timePart}`);

  // 24-hour format (HH:mm)
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const formatDate = (dateString: string) => {
  // return new Date(dateString).toISOString().split('T')[0];
  return toLocalISOString(new Date(dateString)).split('T')[0];
};
