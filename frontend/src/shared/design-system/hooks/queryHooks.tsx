import { useQuery } from '@apollo/client';

import { GET_USER_ROLE_IN_PROJECT } from '@frontend/graphql/queries/GetUserRoleInProject';

export interface RoleData {
  userRoleInProject: string;
}

export const useUserRoleInProject = (userId?: string, projectId?: string) => {
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
