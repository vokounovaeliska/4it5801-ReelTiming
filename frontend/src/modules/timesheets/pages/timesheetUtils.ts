import { Timesheet, UserOption } from '../interfaces';

export const filterTimesheets = (
  timesheets: Timesheet[],
  startDate: string,
  endDate: string,
  selectedUsers: UserOption[],
): Timesheet[] => {
  return timesheets.filter((ts: Timesheet) => {
    const tsDate = new Date(ts.start_date).getTime();
    const isWithinDateRange =
      (!startDate || tsDate >= new Date(startDate).getTime()) &&
      (!endDate || tsDate <= new Date(endDate).getTime());

    const isUserSelected =
      selectedUsers.length === 0 ||
      selectedUsers.some(
        (user: UserOption) => user.value === ts.projectUser.id,
      );

    return isWithinDateRange && isUserSelected;
  });
};

export const sortTimesheets = (timesheets: Timesheet[]): Timesheet[] => {
  return timesheets.sort((a: Timesheet, b: Timesheet) => {
    const startDateA = new Date(a.start_date).getTime();
    const startDateB = new Date(b.start_date).getTime();

    if (startDateA !== startDateB) {
      return startDateB - startDateA;
    }
    const createDateA = new Date(a.create_date).getTime();
    const createDateB = new Date(b.create_date).getTime();
    return createDateB - createDateA;
  });
};
