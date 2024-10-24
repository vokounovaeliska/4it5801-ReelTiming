import { useCallback, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth'; // Import the useAuth hook

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

export function CreateProjectPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [createRequest, createRequestState] = useMutation(
    CREATE_PROJECT_MUTATION,
    {
      onCompleted: (data) => {
        const projectId = data?.addProject?.id;
        if (projectId) {
          navigate(`/projects/${projectId}`);
        }
      },
      onError: () => {},
    },
  );

  const handleCreateProjectFormSubmit = useCallback(
    (variables: FormValues) => {
      // console.log('formvariables', { startDate: variables.startDate });
      // console.log('formvariables', { endDate: variables.endDate });
      //debuging
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
