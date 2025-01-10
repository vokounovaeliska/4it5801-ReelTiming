import { FetchResult, MutationFunctionOptions } from '@apollo/client';
import { format } from 'date-fns';

import {
  AddShiftOverviewMutation,
  AddShiftOverviewMutationVariables,
  DeleteShiftOverviewMutation,
  DeleteShiftOverviewMutationVariables,
  EditShiftOverviewMutation,
  EditShiftOverviewMutationVariables,
  GetShiftOverviewPageDataQuery,
  ShootingDay,
} from '@frontend/gql/graphql';
import {
  showErrorToast,
  showSuccessToast,
} from '@frontend/shared/design-system/molecules/toastUtils';

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

export interface HandleSaveParams {
  data?: GetShiftOverviewPageDataQuery;
  shiftStates: Record<string, boolean>;
  refetch: () => void;
  addShiftOverview: (
    options: MutationFunctionOptions<
      AddShiftOverviewMutation,
      AddShiftOverviewMutationVariables
    >,
  ) => Promise<FetchResult<AddShiftOverviewMutation>>;
  editShiftOverview: (
    options: MutationFunctionOptions<
      EditShiftOverviewMutation,
      EditShiftOverviewMutationVariables
    >,
  ) => Promise<FetchResult<EditShiftOverviewMutation>>;
  deleteShiftOverview: (
    options: MutationFunctionOptions<
      DeleteShiftOverviewMutation,
      DeleteShiftOverviewMutationVariables
    >,
  ) => Promise<FetchResult<DeleteShiftOverviewMutation>>;
}

export const handleSave = async ({
  data,
  shiftStates,
  refetch,
  addShiftOverview,
  editShiftOverview,
  deleteShiftOverview,
}: HandleSaveParams) => {
  const projectId = data?.project?.id;
  if (!projectId) {
    showErrorToast('Project ID is missing.');
    return;
  }

  const groupedByDate: Record<
    string,
    { memberId: string; hasWorked: boolean }[]
  > = {};
  Object.entries(shiftStates).forEach(([key, hasWorked]) => {
    const [memberId, date] = key.split('/');
    if (!groupedByDate[date]) groupedByDate[date] = [];
    groupedByDate[date].push({ memberId, hasWorked });
  });

  console.log('groupedByDate', groupedByDate);

  try {
    for (const [date, members] of Object.entries(groupedByDate)) {
      const existingShift = data?.shiftOverviewsByProjectId.find(
        (overview) => format(new Date(overview.date), 'yyyy-MM-dd') === date,
      );

      const hasWorkedMembers = members
        .filter((m) => m.hasWorked)
        .map((m) => ({ id: m.memberId }));

      console.log(
        ' data?.shiftOverviewsByProjectId',
        data?.shiftOverviewsByProjectId,
      );
      console.log('hasWorkedMembers', hasWorkedMembers);
      console.log('existingShift', existingShift);

      if (hasWorkedMembers.length === 0) {
        if (existingShift) {
          await deleteShiftOverview({
            variables: { shiftOverviewId: existingShift.id },
          });
        }
      } else if (existingShift) {
        await editShiftOverview({
          variables: {
            shiftOverviewId: existingShift.id,
            data: {
              project_id: projectId,
              date: new Date(date).toISOString(),
              crew_working: hasWorkedMembers,
            },
          },
        });
      } else {
        await addShiftOverview({
          variables: {
            projectId,
            date: new Date(date).toISOString(),
            crewWorking: hasWorkedMembers,
          },
        });
      }
    }
    refetch();
    showSuccessToast('Shift overview saved successfully.');
  } catch (err) {
    console.error(err);
    showErrorToast('An error occurred while saving the shift overview.');
  }
};
