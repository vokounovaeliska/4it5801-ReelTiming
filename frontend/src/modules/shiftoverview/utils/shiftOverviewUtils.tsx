export function getAllDatesBetween(
  startDate?: Date | string | null,
  endDate?: Date | string | null,
): Date[] {
  if (!startDate || !endDate) {
    return [];
  }
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  const dates: Date[] = [];
  const currentDate = new Date(start);

  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
