import { format } from 'date-fns';

import {
  GetShiftOverviewPageDataQuery,
  ShootingDay,
} from '@frontend/gql/graphql';

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

export const getShootingDayNumber = (
  shootingDays: ShootingDay[],
  date: Date,
): number | null => {
  const shootingDay = shootingDays.find(
    (day) =>
      format(new Date(day.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'),
  );
  return shootingDay?.shooting_day_number || null;
};

export const groupUsersByDepartment = (
  projectUsers: GetShiftOverviewPageDataQuery['projectUsers'] | undefined,
) => {
  if (!projectUsers) return {};

  return projectUsers.reduce(
    (acc, user) => {
      const department = user.department?.name || 'Other';
      const orderIndex = user.department?.order_index || 0;

      if (!acc[department]) {
        acc[department] = { orderIndex, users: [] };
      }

      acc[department].users.push(user);
      return acc;
    },
    {} as Record<string, { orderIndex: number; users: typeof projectUsers }>,
  );
};
