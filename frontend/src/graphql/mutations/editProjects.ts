import { useMutation, useQuery } from '@apollo/client';
import { formatISO, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import { ShootingDay } from '@frontend/gql/graphql';
import { ADD_SHOOTING_DAY } from '@frontend/graphql/mutations/AddShootingDay';
import { DELETE_SHOOTING_DAY } from '@frontend/graphql/mutations/DeleteShootingDay';
import { EDIT_PROJECT } from '@frontend/graphql/mutations/EditProject';
import { UPDATE_SHOOTING_DAY } from '@frontend/graphql/mutations/EditShootingDay';
import { GET_PROJECT_DETAILS } from '@frontend/graphql/queries/GetProjectDetails';
import { GET_SHOOTING_DAYS } from '@frontend/graphql/queries/GetShootingDays';
import { GET_USER_ROLE_IN_PROJECT } from '@frontend/graphql/queries/GetUserRoleInProject';
import { projectFormValues } from '@frontend/zod/schemas';
import {
  showErrorToast,
  showSuccessToast,
} from '@frontend/shared/design-system/molecules/toastUtils';

export const useProjectConfigOperations = (
  projectId: string,
  userId: string,
) => {
  const navigate = useNavigate();

  const {
    data: projectData,
    refetch: refetchProject,
    loading: projectLoading,
    error: projectError,
  } = useQuery(GET_PROJECT_DETAILS, {
    variables: { id: projectId || '' },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  const {
    data: shootingDaysData,
    refetch: refetchShootingDays,
    loading: shootingDaysLoading,
    error: shootingDaysError,
  } = useQuery(GET_SHOOTING_DAYS, {
    variables: { projectId: projectId || '' },
    fetchPolicy: 'cache-and-network',
  });

  const {
    data: roleData,
    loading: roleLoading,
    error: roleError,
  } = useQuery(GET_USER_ROLE_IN_PROJECT, {
    skip: !userId,
    variables: { userId: userId!, projectId: projectId || '' },
    fetchPolicy: 'cache-and-network',
  });

  const [editProject] = useMutation(EDIT_PROJECT, {
    onCompleted: async () => {
      await refetchProject();
      navigate(`/projects/${projectId}`);
    },
  });

  const [addShootingDay] = useMutation(ADD_SHOOTING_DAY, {
    onCompleted: async () => {
      await refetchShootingDays();
    },
  });

  const [updateShootingDay] = useMutation(UPDATE_SHOOTING_DAY, {
    onCompleted: async () => {
      await refetchShootingDays();
    },
  });

  const [deleteShootingDay] = useMutation(DELETE_SHOOTING_DAY, {
    onCompleted: async () => {
      await refetchShootingDays();
    },
  });

  const handleUpdateShootingDays = async (
    projectId: string,
    alreadyStored: ShootingDay[],
    shootingDays: ShootingDay[],
  ) => {
    const deletePromises = [];
    const addOrUpdatePromises = [];

    for (const stored of alreadyStored) {
      const daysExistsInNew = shootingDays.some((day) => day.id === stored.id);

      if (!daysExistsInNew) {
        deletePromises.push(
          deleteShootingDay({
            variables: { shootingDayId: stored.id },
          }).catch((error) => {
            console.error('Error deleting shooting day:', error);
            showErrorToast('Failed to delete shooting day. Please try again.');
          }),
        );
      }
    }

    for (const newShootingDay of shootingDays) {
      const existingShootingDay = alreadyStored.find(
        (stored) => stored.id === newShootingDay.id,
      );

      if (existingShootingDay) {
        if (
          existingShootingDay.shooting_day_number !==
            newShootingDay.shooting_day_number ||
          existingShootingDay.date !== newShootingDay.date
        ) {
          addOrUpdatePromises.push(
            updateShootingDay({
              variables: {
                data: {
                  shooting_day_number: newShootingDay.shooting_day_number,
                  date: formatISO(parseISO(newShootingDay.date)),
                  event_type: newShootingDay.event_type,
                  project_id: projectId,
                },
                shootingDayId: newShootingDay.id,
              },
            }).catch((error) => {
              console.error('Error updating shooting day:', error);
              showErrorToast(
                'Failed to update shooting day. Please try again.',
              );
            }),
          );
        }
      } else {
        addOrUpdatePromises.push(
          addShootingDay({
            variables: {
              projectId,
              eventType: newShootingDay.event_type,
              date: formatISO(parseISO(newShootingDay.date)),
              shootingDayNumber: newShootingDay.shooting_day_number,
            },
          }).catch((error) => {
            console.error('Error adding shooting day:', error);
            showErrorToast('Failed to add shooting day. Please try again.');
          }),
        );
      }
    }

    if (deletePromises.length > 0) {
      await Promise.all(deletePromises);
    }

    if (addOrUpdatePromises.length > 0) {
      await Promise.all(addOrUpdatePromises);
    }
  };

  const handleEditProject = async (
    data: projectFormValues,
    alreadyStoredShootingDays: ShootingDay[],
    shootingDays: ShootingDay[],
  ) => {
    editProject({
      variables: {
        projectId,
        data: {
          description: data.description,
          name: data.name,
          production_company: data.productionCompany,
          start_date: data.startDate,
          end_date: data.endDate ?? null,
          last_update_user_id: userId,
          currency: data.currency,
          is_active: data.isActive,
          logo: data.logo,
        },
      },
    })
      .then(() => {
        return handleUpdateShootingDays(
          projectId!,
          alreadyStoredShootingDays,
          shootingDays,
        );
      })
      .then(() => {
        showSuccessToast('Project updated successfully.');
      })
      .catch((error) => {
        showErrorToast(`Project update failed! Error: \n\t ${error.message}`);
        console.error('Failed to update project:', error);
      });
  };

  const loading = projectLoading || shootingDaysLoading || roleLoading;
  const error = projectError || shootingDaysError || roleError;

  const errorMessage = error
    ? error.message || 'An error occurred while fetching data.'
    : null;

  return {
    projectData,
    shootingDaysData,
    roleData,
    loading,
    errorMessage,
    handleEditProject,
    handleUpdateShootingDays,
  };
};
