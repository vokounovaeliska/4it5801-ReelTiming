import { useCallback, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';

import { FormValues } from '../organisms/CreateProjectForm';
import { CreateProjectTemplate } from '../templates/CreateProjectTemplate';

const CREATE_PROJECT_MUTATION = gql(/* GraphQL */
`
  mutation Mutation(
    $productionCompany: String!
    $name: String!
    $endDate: DateTimeISO
    $startDate: DateTimeISO
    $description: String
  ) {
    addProject(
      production_company: $productionCompany
      name: $name
      end_date: $endDate
      start_date: $startDate
      description: $description
    ) {
      id
      name
      production_company
      description
      start_date
      end_date
      create_date
      create_user_id
      last_update_user_id
      last_update_date
      is_active
    }
  }
`);

const ADD_PROJECT_USER_MUTATION = gql(/* GraphQL */
`
  mutation AddProjectUser(
    $projectId: String!
    $userId: String!
    $isTeamLeader: Boolean!
    $rateId: String
    $departmentId: String
    $role: String!
    $invitation: String
    $phone_number: String
  ) {
    addProjectUser(
      projectId: $projectId
      userId: $userId
      isTeamLeader: $isTeamLeader
      rateId: $rateId
      departmentId: $departmentId
      role: $role
      invitation: $invitation
      phone_number: $phone_number
    ) {
      id
      project {
        id
      }
      user {
        id
      }
      is_team_leader
      role
    }
  }
`);

export function CreateProjectPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [createRequest, createRequestState] = useMutation(
    CREATE_PROJECT_MUTATION,
    {
      onCompleted: (data) => {
        const projectId = data?.addProject?.id;
        if (projectId && auth.user) {
          addProjectUser({
            variables: {
              projectId,
              userId: auth.user.id,
              isTeamLeader: true,
              rateId: null,
              departmentId: null,
              role: 'ADMIN',
              invitation: null,
              phone_number: null,
            },
          });
          navigate(`/projects/${projectId}`);
        }
      },
      onError: () => {},
    },
  );

  const [addProjectUser] = useMutation(ADD_PROJECT_USER_MUTATION, {
    onError: () => {},
  });

  const handleCreateProjectFormSubmit = useCallback(
    (variables: FormValues) => {
      if (!variables.startDate || !variables.endDate) {
        console.error(
          'Invalid date(s). Please enter valid start and end dates.',
        );
        return;
      }

      createRequest({ variables });
    },
    [createRequest],
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
      isLoading={createRequestState.loading}
      error={createRequestState.error}
      onSubmit={handleCreateProjectFormSubmit}
    />
  );
}
