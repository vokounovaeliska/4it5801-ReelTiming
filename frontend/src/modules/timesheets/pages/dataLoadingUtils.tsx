import { useEffect } from 'react';

import { useUserRoleInProject } from '@frontend/shared/design-system/hooks/queryHooks';

import { DataLoadingUtilsProps, DataLoadingUtilsResult } from '../interfaces';

import {
  useAdminStatements,
  useAllCarsOnProjectByProjectUserId,
  useAllProjectUsers,
  useCarsByProjectUserId,
  useCrewStatements,
  useCrewUserInfoTimesheets,
} from './queryHooks';

export const DataLoadingUtils = ({
  auth: authUser,
  projectId,
  setUserInfo,
}: DataLoadingUtilsProps): DataLoadingUtilsResult => {
  const { userInfoData, userInfoLoading, userInfoError } =
    useCrewUserInfoTimesheets(authUser?.id ?? '', projectId ?? '');
  const { roleData, roleLoading, roleError } = useUserRoleInProject(
    authUser?.id,
    projectId,
  );
  const { crewData, crewLoading, crewError } = useCrewStatements(
    userInfoData?.projectUserDetails?.id ?? '',
  );
  const { adminData, adminLoading, adminError } = useAdminStatements(projectId);
  const { allProjectUsersData, allProjectUsersLoading, allProjectUsersError } =
    useAllProjectUsers(projectId ?? '');
  const allProjectUsersDataForOptions = allProjectUsersData;
  const {
    allCarsOnProjectData,
    allCarsOnProjectLoading,
    allCarsOnProjectError,
  } = useAllCarsOnProjectByProjectUserId(projectId ?? '');
  const { userCarsData, userCarsLoading, userCarsError } =
    useCarsByProjectUserId(userInfoData?.projectUserDetails?.id ?? '');

  useEffect(() => {
    if (userInfoData?.projectUserDetails) {
      setUserInfo(userInfoData.projectUserDetails);
    }
  }, [userInfoData, setUserInfo]);

  const isDataAvailable =
    !!roleData?.userRoleInProject &&
    (crewData?.statementsByProjectUserId || adminData?.statementsByProjectId) &&
    !!userInfoData?.projectUserDetails &&
    !!allProjectUsersData?.projectUsers &&
    !!allCarsOnProjectData?.projectUsers &&
    !!userCarsData;

  const loading =
    !isDataAvailable &&
    (roleLoading ||
      crewLoading ||
      adminLoading ||
      userInfoLoading ||
      allProjectUsersLoading ||
      allCarsOnProjectLoading ||
      userCarsLoading);

  const error =
    roleError?.message ||
    userInfoError?.message ||
    crewError?.message ||
    adminError?.message ||
    allProjectUsersError?.message ||
    allCarsOnProjectError?.message ||
    userCarsError?.message ||
    (!authUser && 'User not authenticated');

  return {
    isDataAvailable: !!isDataAvailable,
    loading,
    error,
    roleData,
    crewData,
    adminData,
    allProjectUsersData,
    allProjectUsersDataForOptions,
    allCarsOnProjectData,
    userInfoData,
    userCarsData,
  };
};
