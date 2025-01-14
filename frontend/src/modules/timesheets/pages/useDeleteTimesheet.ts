import { useMutation } from '@apollo/client';
import { DELETE_STATEMENT } from '@frontend/graphql/mutations/DeleteStatement';
import {
  showErrorToast,
  showSuccessToast,
} from '@frontend/shared/design-system/molecules/toastUtils';
import {
  GET_ADMIN_STATEMENTS,
  GET_CREW_STATEMENTS,
} from '@frontend/graphql/queries/GetStatements';
import { useState } from 'react';
import { UseDeleteTimesheetProps } from '../interfaces';

export const useDeleteTimesheet = ({
  projectId,
  userRole,
  userInfoData,
}: UseDeleteTimesheetProps) => {
  const [deleteStatement] = useMutation(DELETE_STATEMENT);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [timesheetIdToDelete, setTimesheetIdToDelete] = useState<string | null>(
    null,
  );

  const handleDeleteClick = (id: string) => {
    setTimesheetIdToDelete(id);
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (timesheetIdToDelete) {
      try {
        await deleteTimesheet(timesheetIdToDelete);
        showSuccessToast('Timesheet deleted successfully.');
      } catch (error) {
        showErrorToast('Failed to delete timesheet. Please try again.');
      } finally {
        setTimesheetIdToDelete(null);
        setIsAlertOpen(false);
      }
    }
  };

  const deleteTimesheet = async (id: string) => {
    try {
      await deleteStatement({
        variables: { id },
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
    } catch (error) {
      console.error('Error deleting statement:', error);
    }
  };

  return {
    isAlertOpen,
    setIsAlertOpen,
    handleDeleteClick,
    handleConfirmDelete,
  };
};
