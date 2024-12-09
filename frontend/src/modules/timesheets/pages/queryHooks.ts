import { useQuery } from '@apollo/client';
import { GET_ALL_PROJECT_USERS } from '@frontend/gql/queries/GetAllProjectUsers';
import { GET_CREWUSERINFO_TIMESHEETS } from '@frontend/gql/queries/GetCrewUserInfoTimesheets';
import { GET_USER_ROLE_IN_PROJECT } from '@frontend/gql/queries/GetUserRoleInProject';
import {
  GET_CREW_STATEMENTS,
  GET_ADMIN_STATEMENTS,
} from '@frontend/gql/queries/GetStatements';
import { GET_ALL_CARS_ON_PROJECT_BY_PROJECTUSER_ID } from '@frontend/gql/queries/GetAllCarsOnProjectByProjectUserId';
import { GET_CARS_BY_PROJECT_USER_ID } from '@frontend/gql/queries/GetCarsByProjectUserId';

export const useAllProjectUsers = (projectId: string) => {
  const {
    data: allProjectUsersData,
    loading: allProjectUsersLoading,
    error: allProjectUsersError,
  } = useQuery(GET_ALL_PROJECT_USERS, {
    variables: { projectId },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  return { allProjectUsersData, allProjectUsersLoading, allProjectUsersError };
};

export const useCrewUserInfoTimesheets = (
  userId: string,
  projectId: string,
) => {
  const {
    data: userInfoData,
    loading: userInfoLoading,
    error: userInfoError,
  } = useQuery(GET_CREWUSERINFO_TIMESHEETS, {
    skip: !userId,
    variables: { userId, projectId },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  return { userInfoData, userInfoLoading, userInfoError };
};

export const useUserRoleInProject = (userId: string, projectId: string) => {
  const {
    data: roleData,
    loading: roleLoading,
    error: roleError,
  } = useQuery(GET_USER_ROLE_IN_PROJECT, {
    skip: !userId,
    variables: { userId, projectId },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  return { roleData, roleLoading, roleError };
};

export const useCrewStatements = (projectUserId: string) => {
  const {
    data: crewData,
    loading: crewLoading,
    error: crewError,
  } = useQuery(GET_CREW_STATEMENTS, {
    skip: !projectUserId,
    variables: { projectUserId },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  return { crewData, crewLoading, crewError };
};

export const useAdminStatements = (projectId: string) => {
  const {
    data: adminData,
    loading: adminLoading,
    error: adminError,
  } = useQuery(GET_ADMIN_STATEMENTS, {
    skip: !projectId,
    variables: { projectId },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  return { adminData, adminLoading, adminError };
};

export const useAllCarsOnProjectByProjectUserId = (projectId: string) => {
  const {
    data: allCarsOnProjectData,
    loading: allCarsOnProjectLoading,
    error: allCarsOnProjectError,
    refetch,
  } = useQuery(GET_ALL_CARS_ON_PROJECT_BY_PROJECTUSER_ID, {
    variables: { projectId },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  return {
    allCarsOnProjectData,
    allCarsOnProjectLoading,
    allCarsOnProjectError,
    refetch,
  };
};

export const useCarsByProjectUserId = (projectUserId: string) => {
  const {
    data: userCarsData,
    loading: userCarsLoading,
    error: userCarsError,
  } = useQuery(GET_CARS_BY_PROJECT_USER_ID, {
    variables: { projectUserId },
    skip: !projectUserId,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  return { userCarsData, userCarsLoading, userCarsError };
};
