import { useQuery } from '@apollo/client';
import { GET_USER_ROLE_IN_PROJECT } from '@frontend/graphql/queries/GetUserRoleInProject';

import { GET_PROJECT_DETAILS } from '@frontend/graphql/queries/GetProjectDetails';
import { Project, RoleData } from './interfaces/interface';

export const useUserRoleInProject = (userId: string, projectId: string) => {
  const {
    data: roleData,
    loading: roleLoading,
    error: roleError,
  } = useQuery<RoleData>(GET_USER_ROLE_IN_PROJECT, {
    skip: !userId || !projectId,
    variables: { userId, projectId },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  return { roleData, roleLoading, roleError };
};

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
