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

//když označím nově něco s has worked a on zároveň má už i vyplněný shift, tak se všem ostatním v tomto dni smaže "has worked"

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

  const editedGroupedByDate: Record<
    string,
    { memberId: string; hasWorked: boolean }[]
  > = {};
  Object.entries(shiftStates).forEach(([key, hasWorked]) => {
    const [memberId, date] = key.split('/');
    if (!editedGroupedByDate[date]) editedGroupedByDate[date] = [];
    editedGroupedByDate[date].push({ memberId, hasWorked });
  });

  let existingShiftOverviews = [...data.shiftOverviewsByProjectId];

  try {
    for (const [date, members] of Object.entries(editedGroupedByDate)) {
      const existingShiftIndex = existingShiftOverviews.findIndex(
        (overview) => format(new Date(overview.date), 'yyyy-MM-dd') === date,
      );
      const existingShift =
        existingShiftIndex !== -1
          ? existingShiftOverviews[existingShiftIndex]
          : null;

      const hasWorkedMembers = members
        .filter((member) => member.hasWorked)
        .map((member) => ({ id: member.memberId }));

      if (existingShift) {
        const mergedMembers = [
          ...existingShift.crew_working.filter(
            (existingMember) =>
              !editedGroupedByDate[date]?.some(
                (editedMember) =>
                  editedMember.memberId === existingMember.id &&
                  !editedMember.hasWorked,
              ),
          ),
          ...hasWorkedMembers.filter(
            (newMember) =>
              !existingShift.crew_working.some(
                (existingMember) => existingMember.id === newMember.id,
              ) &&
              editedGroupedByDate[date]?.some(
                (editedMember) =>
                  editedMember.memberId === newMember.id &&
                  editedMember.hasWorked,
              ),
          ),
        ];

        if (mergedMembers.length === 0) {
          await deleteShiftOverview({
            variables: { shiftOverviewId: existingShift.id },
          });
          existingShiftOverviews = existingShiftOverviews.filter(
            (overview) => overview.id !== existingShift.id,
          );
        } else {
          const sanitizedCrewWorking = mergedMembers.map(({ id }) => ({ id }));

          await editShiftOverview({
            variables: {
              shiftOverviewId: existingShift.id,
              data: {
                project_id: projectId,
                date: new Date(date).toISOString(),
                crew_working: sanitizedCrewWorking,
              },
            },
          });
          existingShiftOverviews[existingShiftIndex] = {
            ...existingShift,
            crew_working: sanitizedCrewWorking,
          };
        }
      } else if (hasWorkedMembers.length > 0) {
        const result = await addShiftOverview({
          variables: {
            projectId,
            date: new Date(date).toISOString(),
            crewWorking: hasWorkedMembers,
          },
        });
        const newShiftOverview = result.data?.addShiftOverview;
        if (newShiftOverview) {
          existingShiftOverviews.push(newShiftOverview);
        }
      }
    }

    await refetch();
    showSuccessToast('Shift overview saved successfully.');
  } catch (err) {
    console.error(err);
    showErrorToast('An error occurred while saving the shift overview.');
  }
};

export function transformToMemberDateMap(
  membersByDate: Map<
    number,
    Set<GetShiftOverviewPageDataQuery['projectUsers'][number]>
  >,
): Map<string, Set<number>> {
  const memberDateMap = new Map<string, Set<number>>();

  membersByDate.forEach((members, date) => {
    members.forEach((member) => {
      const memberDates = memberDateMap.get(member.id) || new Set<number>();
      memberDates.add(date);
      memberDateMap.set(member.id, memberDates);
    });
  });

  return memberDateMap;
}
