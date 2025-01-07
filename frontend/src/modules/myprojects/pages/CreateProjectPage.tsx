import { useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { ACTIVATE_PROJECT_USER } from '@frontend/graphql/mutations/ActivateProjectUser';
import { ADD_PROJECT } from '@frontend/graphql/mutations/AddProject';
import { ADD_PROJECT_USER } from '@frontend/graphql/mutations/AddProjectUser';
import { ADD_RATE } from '@frontend/graphql/mutations/AddRate';
import { useAuth } from '@frontend/modules/auth';
import { projectFormValues } from '@frontend/zod/schemas';

import { CreateProjectTemplate } from '../templates/CreateProjectTemplate';

export function CreateProjectPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [addProject, { loading: addingProject, error: addProjectError }] =
    useMutation(ADD_PROJECT);

  const [
    addProjectUser,
    { loading: addingProjectUser, error: addProjectUserError },
  ] = useMutation(ADD_PROJECT_USER);

  const [addRate, { loading: addingRate, error: addRateError }] =
    useMutation(ADD_RATE);

  const [
    activateProjectUser,
    { loading: activatingUser, error: activateProjectUserError },
  ] = useMutation(ACTIVATE_PROJECT_USER);

  const handleCreateProjectFormSubmit = useCallback(
    async (variables: projectFormValues) => {
      if (!variables.startDate || !variables.endDate) {
        console.error(
          'Invalid date(s). Please enter valid start and end dates.',
        );
        return;
      }

      try {
        const updatedVariables = {
          ...variables,
          startDate: variables.startDate.toISOString(),
          endDate: variables.endDate.toISOString(),
          create_user_id: auth.user?.id || '',
        };

        const { data: projectData } = await addProject({
          variables: updatedVariables,
        });
        const projectId = projectData?.addProject?.id;

        if (projectId && auth.user) {
          const { data: rateData } = await addRate({
            variables: {
              standardRate: 0,
              compensationRate: 0,
              overtimeHour1: 0,
              overtimeHour2: 0,
              overtimeHour3: 0,
              overtimeHour4: 0,
            },
          });

          const rateId = rateData?.addRate?.id;

          const departments = projectData?.addProject?.departments;
          let departmentId = '';

          if (departments) {
            const productionDepartment = departments.find(
              (department: { id: string; name: string }) =>
                department.name === 'Production',
            );
            if (productionDepartment) {
              departmentId = productionDepartment.id;
            }
          }

          await addProjectUser({
            variables: {
              projectId,
              isTeamLeader: true,
              rateId,
              departmentId: departmentId,
              role: 'ADMIN',
              invitation: projectId,
              phone_number: null,
              email: auth.user.email,
              name: auth.user.name,
              surname: auth.user.surname,
              position: '',
            },
          });

          await activateProjectUser({
            variables: {
              userId: auth.user.id,
              token: projectId,
            },
          });
          activateProjectUser({
            variables: {
              userId: auth.user.id,
              token: projectId,
            },
          });

          navigate(`/projects/${projectId}`);
        }
      } catch (error) {
        console.error('Error during project creation:', error);
      }
    },
    [
      addProject,
      addRate,
      addProjectUser,
      activateProjectUser,
      auth.user,
      navigate,
    ],
  );

  useEffect(() => {
    if (!auth.user) {
      navigate('/');
    }
  }, [auth.user, navigate]);

  if (!auth.user) {
    return null;
  }

  return (
    <CreateProjectTemplate
      isLoading={
        addingProject || addingRate || addingProjectUser || activatingUser
      }
      error={
        addProjectError ||
        addRateError ||
        addProjectUserError ||
        activateProjectUserError
      }
      onSubmit={handleCreateProjectFormSubmit}
    />
  );
}
