import { useQuery } from '@apollo/client';

import { GET_PROJECT_DETAILS } from '@frontend/graphql/queries/GetProjectDetails';
import { Project } from '../interfaces/interface';

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
