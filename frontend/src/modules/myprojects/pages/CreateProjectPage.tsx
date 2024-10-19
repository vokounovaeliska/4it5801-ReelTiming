import { useCallback, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth'; // Import the useAuth hook
import { route } from '@frontend/route';

import { FormValues } from '../organisms/CreateProjectForm';
import { CreateProjectTemplate } from '../templates/CreateProjectTemplate';

const CREATE_PROJECT_MUTATION = gql(/* GraphQL */ //TODO add description
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

export function CreateProjectPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [createRequest, createRequestState] = useMutation(
    CREATE_PROJECT_MUTATION,
    {
      onCompleted: () => {
        navigate(route.myprojects()); //TODO project dashboard page
      },
      onError: () => {},
    },
  );

  const handleCreateProjectFormSubmit = useCallback(
    (variables: FormValues) => {
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
