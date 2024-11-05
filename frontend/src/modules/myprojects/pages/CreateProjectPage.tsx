import { useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { ACTIVATE_PROJECT_USER } from '@frontend/gql/mutations/ActivateProjectUser';
import { ADD_PROJECT } from '@frontend/gql/mutations/AddProject';
import { ADD_PROJECT_USER } from '@frontend/gql/mutations/AddProjectUser';
import { ADD_RATE } from '@frontend/gql/mutations/AddRate';
import { useAuth } from '@frontend/modules/auth';

import { FormValues } from '../organisms/CreateProjectForm';
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
    async (variables: FormValues) => {
      if (!variables.startDate || !variables.endDate) {
        console.error(
          'Invalid date(s). Please enter valid start and end dates.',
        );
        return;
      }

      try {
        const { data: projectData } = await addProject({ variables });
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

          await addProjectUser({
            variables: {
              projectId,
              userId: auth.user.id,
              isTeamLeader: true,
              rateId,
              departmentId: '8dbf52d6-75e3-4e91-a1f4-24a79cf74cdd', // Replace with your actual department ID
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
