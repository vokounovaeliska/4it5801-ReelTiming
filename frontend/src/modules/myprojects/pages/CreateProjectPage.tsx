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
    $email: String!
    $name: String!
    $surname: String!
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
      email: $email
      name: $name
      surname: $surname
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

const ADD_RATE_MUTATION = gql(/* GraphQL */
`
  mutation AddRate(
    $standardRate: Float!
    $compensationRate: Float!
    $overtimeHour1: Float!
    $overtimeHour2: Float!
    $overtimeHour3: Float!
    $overtimeHour4: Float!
  ) {
    addRate(
      standard_rate: $standardRate
      compensation_rate: $compensationRate
      overtime_hour1: $overtimeHour1
      overtime_hour2: $overtimeHour2
      overtime_hour3: $overtimeHour3
      overtime_hour4: $overtimeHour4
    ) {
      id
    }
  }
`);

const ACTIVATE_PROJECT_USER_MUTATION = gql`
  mutation ActivateProjectUser($userId: String!, $token: String!) {
    activateProjectUser(userId: $userId, token: $token)
  }
`;

export function CreateProjectPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [createRequest, createRequestState] = useMutation(
    CREATE_PROJECT_MUTATION,
    {
      onCompleted: async (data) => {
        const projectId = data?.addProject?.id;
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
              rateId: rateId,
              departmentId: '53964a96-17f1-4c96-a69d-cec10f2b01b6',
              role: 'ADMIN',
              invitation: projectId,
              phone_number: null,
              email: auth.user.email,
              name: auth.user.name,
              surname: auth.user.surname,
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
      },
      onError: () => {},
    },
  );

  const [addProjectUser] = useMutation(ADD_PROJECT_USER_MUTATION, {
    onError: () => {},
  });

  const [addRate] = useMutation(ADD_RATE_MUTATION, {
    onError: () => {},
  });

  const [activateProjectUser] = useMutation(ACTIVATE_PROJECT_USER_MUTATION, {
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
