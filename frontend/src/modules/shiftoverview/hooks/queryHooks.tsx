import { useQuery } from '@apollo/client';

import { Project } from '@frontend/gql/graphql';
import { GET_PROJECT_DETAILS } from '@frontend/graphql/queries/GetProjectDetails';

export const useProjectDetails = (projectId: string) => {
  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useQuery<{ project: Project }>(GET_PROJECT_DETAILS, {
    skip: !projectId,
    variables: { id: projectId },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  return { projectData, projectLoading, projectError };
};
