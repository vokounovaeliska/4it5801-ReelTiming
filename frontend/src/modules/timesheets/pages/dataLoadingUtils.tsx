import { useEffect } from 'react';

import { DataLoadingUtilsProps, DataLoadingUtilsResult } from '../interfaces';

import {
  useAdminStatements,
  useAllCarsOnProjectByProjectUserId,
  useAllProjectUsers,
  useCarsByProjectUserId,
  useCrewStatements,
  useCrewUserInfoTimesheets,
  useUserRoleInProject,
} from './queryHooks';

export const DataLoadingUtils = ({
  auth,
  projectId,
  setUserInfo,
}: DataLoadingUtilsProps): DataLoadingUtilsResult => {
  const { userInfoData, userInfoLoading, userInfoError } =
    useCrewUserInfoTimesheets(auth.user?.id ?? '', projectId ?? '');
  const { roleData, roleLoading, roleError } = useUserRoleInProject(
    auth.user?.id ?? '',
    projectId ?? '',
  );
  const { crewData, crewLoading, crewError } = useCrewStatements(
    userInfoData?.projectUserDetails?.id ?? '',
  );
  const { adminData, adminLoading, adminError } = useAdminStatements(
    projectId ?? '',
  );
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
    (!auth.user && 'User not authenticated');

  return {
    isDataAvailable: !!isDataAvailable, // Ensure it's always a boolean
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
