import { useMutation } from '@apollo/client';
import { ADD_STATEMENT } from '@frontend/graphql/mutations/AddStatement';
import {
  showErrorToast,
  showSuccessToast,
} from '@frontend/shared/design-system/molecules/toastUtils';
import {
  GET_ADMIN_STATEMENTS,
  GET_CREW_STATEMENTS,
} from '@frontend/graphql/queries/GetStatements';
import { useApolloClient } from '@apollo/client';
import { Timesheet, UseAddTimesheetProps } from '../interfaces';
import { formatTimeForParsing, toLocalISOString } from '../utils/timeUtils';

export const useAddTimesheet = ({
  projectId,
  userRole,
  userInfoData,
  userInfo,
}: UseAddTimesheetProps) => {
  const [addStatement] = useMutation(ADD_STATEMENT);
  const client = useApolloClient();

  const handleAddTimesheet = async (data: Timesheet) => {
    try {
      const formattedFromTime = formatTimeForParsing(data.from);
      const formattedToTime = formatTimeForParsing(data.to);
      const variables = {
        project_user_id: data.projectUser.id,
        start_date: toLocalISOString(new Date(data.start_date)),
        from: toLocalISOString(
          new Date(`${data.start_date.split('T')[0]}T${formattedFromTime}`),
        ),
        to: toLocalISOString(
          new Date(`${data.start_date.split('T')[0]}T${formattedToTime}`),
        ),
        shift_lenght: Number(data.shift_lenght) || 0,
        calculated_overtime: data.calculated_overtime || 0,
        claimed_overtime: data.claimed_overtime || 0,
        create_date: toLocalISOString(new Date()),
        car_id: data.car_id || null,
        kilometers: data.kilometers || null,
      };
      const response = await addStatement({
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
      const newTimesheet = {
        ...variables,
        id: response?.data?.addStatement.id,
        projectUser: userInfo,
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
              ? [...(cacheData?.statementsByProjectUserId || []), newTimesheet]
              : cacheData?.statementsByProjectUserId
                ? [...cacheData.statementsByProjectUserId, newTimesheet]
                : [],
        },
      });
      showSuccessToast('Timesheet added successfully.');
    } catch (error) {
      console.error('Error adding statement:', error);
      showErrorToast('Failed to add timesheet. Please try again.');
    }
  };

  return {
    handleAddTimesheet,
  };
};
