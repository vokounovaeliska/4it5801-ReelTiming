import { addDays, format, max } from 'date-fns';

import { ShootingDay } from '@frontend/gql/graphql';

import { ProjectData } from '../pages/EditProjectPage';

export const calculateNewDate = (
  days: ShootingDay[],
  startDate?: string | null,
): string => {
  if (days.length === 0) {
    return startDate || format(Date.now(), 'yyyy-MM-dd');
  }
  const maximumDate = max(days.map((day) => new Date(day.date)));
  return format(addDays(maximumDate, 1), 'yyyy-MM-dd');
};

export const calculateNewDayNumber = (days: ShootingDay[]): number => {
  if (days.length === 0) {
    return 1;
  }
  return Math.max(...days.map((day) => day.shooting_day_number)) + 1;
};

export const isDateWithinProjectDays = (
  shootingDay: ShootingDay,
  projectData: ProjectData,
): boolean => {
  if (!projectData || !shootingDay || !shootingDay.date) {
    return false;
  }

  if (projectData.start_date && projectData.end_date) {
    const shootingDayDate = new Date(shootingDay.date).getTime();
    const startDate = new Date(projectData.start_date).getTime();
    const endDate = new Date(projectData.end_date).getTime();

    return shootingDayDate >= startDate && shootingDayDate <= endDate;
  }

  return false;
};

export const validateShootingDay = (
  shootingDay: ShootingDay,
  shootingDaysCollection: ShootingDay[],
  isEditing: boolean,
): { valid: boolean; message: string } => {
  const isDuplicateDayNumber = shootingDaysCollection.some(
    (day) =>
      day.shooting_day_number === shootingDay.shooting_day_number &&
      (!isEditing || day.id !== shootingDay.id),
  );

  if (isDuplicateDayNumber) {
    return { valid: false, message: 'A day with this number already exists!' };
  }

  const isDuplicateDayDate = shootingDaysCollection.some(
    (day) =>
      new Date(day.date).getTime() === new Date(shootingDay.date).getTime() &&
      (!isEditing || day.id !== shootingDay.id),
  );

  if (isDuplicateDayDate) {
    return {
      valid: false,
      message: 'A shooting day with this date already exists!',
    };
  }

  return { valid: true, message: '' };
};
