import { useMutation } from '@apollo/client';
import { EDIT_STATEMENT } from '@frontend/graphql/mutations/EditStatement';
import {
  showErrorToast,
  showSuccessToast,
} from '@frontend/shared/design-system/molecules/toastUtils';
import {
  GET_ADMIN_STATEMENTS,
  GET_CREW_STATEMENTS,
} from '@frontend/graphql/queries/GetStatements';
import { useApolloClient } from '@apollo/client';
import {
  Timesheet,
  TimesheetCache,
  UseEditTimesheetProps,
} from '../interfaces';
import { formatTimeForParsing, toLocalISOString } from '../utils/timeUtils';

export const useEditTimesheet = ({
  projectId,
  userRole,
  userInfoData,
  selectedTimesheet,
  userInfo,
}: UseEditTimesheetProps) => {
  const [editStatement] = useMutation(EDIT_STATEMENT);
  const client = useApolloClient();

  const handleEditTimesheet = async (data: Timesheet) => {
    try {
      console.log('Editing statement:', data);
      const formattedFromTime = formatTimeForParsing(data.from);
      const formattedToTime = formatTimeForParsing(data.to);
      const startDate = new Date(data.start_date);
      const fromTime = new Date(
        `${data.start_date.split('T')[0]}T${formattedFromTime}`,
      );
      const toTime = new Date(
        `${data.start_date.split('T')[0]}T${formattedToTime}`,
      );
      if (
        isNaN(startDate.getTime()) ||
        isNaN(fromTime.getTime()) ||
        isNaN(toTime.getTime())
      ) {
        throw new Error('Invalid date or time value');
      }
      const variables = {
        id: selectedTimesheet?.id || '',
        data: {
          project_user_id: userInfo!.id!,
          start_date: toLocalISOString(startDate),
          from: toLocalISOString(fromTime),
          to: toLocalISOString(toTime),
          shift_lenght: Number(data.shift_lenght) || 0,
          calculated_overtime: data.calculated_overtime || 0,
          claimed_overtime: data.claimed_overtime || 0,
          last_update_date: toLocalISOString(new Date()),
          last_update_user_id: userInfo?.id,
          car_id: data.car_id || null,
          kilometers: data.kilometers || null,
        },
      };
      await editStatement({
        variables,
        refetchQueries: [
          {
            query:
              userRole === 'ADMIN' ? GET_ADMIN_STATEMENTS : GET_CREW_STATEMENTS,
            variables:
              userRole === 'ADMIN'
                ? { projectId }
                : { projectUserId: userInfoData?.projectUserDetails?.id },
          },
        ],
      });
      const cacheData = client.readQuery({
        query:
          userRole === 'ADMIN' ? GET_ADMIN_STATEMENTS : GET_CREW_STATEMENTS,
        variables:
          userRole === 'ADMIN'
            ? { projectUserId: projectId }
            : { projectUserId: userInfoData?.projectUserDetails?.id ?? '' },
      });
      const updatedTimesheet = {
        ...variables.data,
        id: selectedTimesheet?.id || '',
        projectUser: {
          ...userInfo,
          email: userInfo?.email,
        },
      };

      client.writeQuery({
        query:
          userRole === 'ADMIN' ? GET_ADMIN_STATEMENTS : GET_CREW_STATEMENTS,
        variables:
          userRole === 'ADMIN'
            ? { projectUserId: projectId }
            : { projectUserId: userInfoData?.projectUserDetails?.id ?? '' },
        data: {
          ...cacheData,
          statementsByProjectUserId:
            userRole === 'ADMIN'
              ? cacheData?.statementsByProjectUserId?.map(
                  (ts: TimesheetCache) =>
                    ts.id === selectedTimesheet?.id ? updatedTimesheet : ts,
                ) || []
              : cacheData?.statementsByProjectUserId?.map(
                  (ts: TimesheetCache) =>
                    ts.id === selectedTimesheet?.id ? updatedTimesheet : ts,
                ) || [],
        },
      });
      showSuccessToast('Timesheet updated successfully.');
    } catch (error) {
      console.error('Error editing statement:', error);
      showErrorToast('Failed to update timesheet. Please try again.');
    }
  };

  return {
    handleEditTimesheet,
  };
};
