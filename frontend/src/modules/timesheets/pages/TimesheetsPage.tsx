import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Text,
} from '@chakra-ui/react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';
import { LoadingSpinner } from '@frontend/shared/design-system/atoms/LoadingSpinner';
import CustomModal from '@frontend/shared/forms/molecules/CustomModal';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import ProjectNavbar from '@frontend/shared/navigation/components/navbar/ProjectNavbar';

import { TimesheetsForm } from '../forms/TimesheetsForm';
import { UserAuth, UserInfo } from '../interfaces';
import TimesheetsTemplate from '../templates/TimesheetsTemplate';

import { DataLoadingUtils } from './dataLoadingUtils';
import {
  getCarOptionsForLoggedInUser,
  getUserOptionsForAdminAddTimesheet,
  getUserOptionsForUserFilter,
} from './optionsUtils';
import { useTimesheetHandlers } from './timesheetHandlers';
import { filterTimesheets, sortTimesheets } from './timesheetUtils';
import { useDeleteTimesheet } from './useDeleteTimesheet';

export function TimesheetPage() {
  const auth = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [, setSelectedCar] = useState<string | null>(null);
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const reportDirectly =
    searchParams.get('reportDirectly')?.toLowerCase() === 'true';
  useEffect(() => {
    if (reportDirectly) {
      setIsModalOpen(reportDirectly);
      searchParams.delete('reportDirectly');
      setSearchParams(searchParams);
    }
  });

  const isAuthenticated = auth.user !== null;

  const {
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
  } = DataLoadingUtils({
    auth: auth.user,
    projectId: projectId ?? '',
    setUserInfo,
  });

  const {
    isAlertOpen,
    setIsAlertOpen,
    handleDeleteClick,
    handleConfirmDelete,
  } = useDeleteTimesheet({
    projectId: projectId ?? '',
    userRole: roleData?.userRoleInProject ?? '',
    userInfoData: userInfoData!,
  });

  const {
    startDate,
    endDate,
    selectedUsers,
    isModalOpen,
    selectedTimesheet,
    mode,
    handleDateChange,
    handleUserChange,
    handleRowClick,
    handleAddClick,
    handleModalClose,
    handleFormSubmitWrapper,
    setIsModalOpen,
  } = useTimesheetHandlers(
    projectId ?? '',
    roleData ?? null,
    userInfoData,
    userInfo,
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`${route.login()}${`?projectId=${projectId}`}`);
      return;
    }
  }, [isAuthenticated, navigate, loading, projectId]);

  const timesheets = useMemo(() => {
    return roleData?.userRoleInProject === 'ADMIN'
      ? adminData?.statementsByProjectId
      : crewData?.statementsByProjectUserId;
  }, [roleData, adminData, crewData]);

  const carOptionsForLoggedInUser = userCarsData
    ? getCarOptionsForLoggedInUser(userCarsData)
    : [];

  const userOptionsForUserFilter = allProjectUsersDataForOptions?.projectUsers
    ? getUserOptionsForUserFilter(
        allProjectUsersDataForOptions.projectUsers.map((user) => ({
          id: user.id,
          name: user.name,
          surname: user.surname,
        })),
      )
    : [];

  const userOptionsForAdminAddTimesheet = allProjectUsersDataForOptions
    ? getUserOptionsForAdminAddTimesheet(
        allProjectUsersDataForOptions.projectUsers.map((user) => ({
          id: user.id,
          name: user.name,
          surname: user.surname,
        })),
      )
    : [];

  const userRole = roleData?.userRoleInProject;

  if (roleData?.userRoleInProject !== 'ADMIN' && userRole !== 'CREW') {
    navigate(route.myprojects());
    return null;
  }

  const filteredTimesheets = filterTimesheets(
    timesheets ?? [],
    startDate,
    endDate,
    selectedUsers,
  );

  const sortedTimesheets = sortTimesheets(filteredTimesheets);

  const authUser: UserAuth = {
    id: auth.user?.id ?? '',
    email: auth.user?.email ?? '',
    role: roleData?.userRoleInProject ?? '',
  };

  if (loading) {
    return <LoadingSpinner title="timesheets" />;
  }

  if (error || !userInfoData?.projectUserDetails?.project) {
    return (
      <Center minHeight="100vh">
        <Text color="red.500">Error loading project details: {error}</Text>
      </Center>
    );
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <ProjectNavbar projectId={projectId!} userRole={userRole} />
      <TimesheetsTemplate
        startDate={startDate}
        endDate={endDate}
        handleDateChange={handleDateChange}
        handleUserChange={handleUserChange}
        handleAddClick={handleAddClick}
        sortedTimesheets={sortedTimesheets}
        handleRowClick={handleRowClick}
        onDeleteClick={handleDeleteClick}
        userOptions={userOptionsForUserFilter}
        userRole={userRole ?? ''}
        projectUserId={userInfoData?.projectUserDetails.id!}
        authUser={authUser}
        selectedUsers={selectedUsers}
        project={userInfoData?.projectUserDetails?.project}
      />
      <Footer />
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={
          mode === 'add'
            ? 'Add Timesheet for ' +
              userInfoData?.projectUserDetails.project.name
            : 'Edit Timesheet for ' +
              userInfoData?.projectUserDetails.project.name
        }
        size="2xl"
      >
        <TimesheetsForm
          projectId={projectId!}
          initialValues={selectedTimesheet || undefined}
          onClose={handleModalClose}
          mode={mode}
          onSubmit={handleFormSubmitWrapper}
          userRole={userRole ?? ''}
          userOptions={userOptionsForAdminAddTimesheet}
          userInfo={userInfo}
          setSelectedCar={setSelectedCar}
          allCarsOnProjectData={allCarsOnProjectData!}
          carOptionsForLoggedInUser={carOptionsForLoggedInUser}
          userInfoRates={allProjectUsersData!.projectUsers!}
          projectCurrency={userInfoData?.projectUserDetails?.project?.currency!}
        />
      </CustomModal>
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Timesheet
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsAlertOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
