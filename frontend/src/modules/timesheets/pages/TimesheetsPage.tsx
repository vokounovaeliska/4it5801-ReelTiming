import React, { useEffect, useState } from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
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
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { ActionMeta, MultiValue } from 'react-select';

import { ADD_STATEMENT } from '@frontend/gql/mutations/AddStatement';
import { DELETE_STATEMENT } from '@frontend/gql/mutations/DeleteStatement';
import { EDIT_STATEMENT } from '@frontend/gql/mutations/EditStatement';
import { GET_ALL_CARS_ON_PROJECT_BY_PROJECTUSER_ID } from '@frontend/gql/queries/GetAllCarsOnProjectByProjectUserId';
import { GET_ALL_PROJECT_USERS } from '@frontend/gql/queries/GetAllProjectUsers';
import { GET_CARS_BY_PROJECT_USER_ID } from '@frontend/gql/queries/GetCarsByProjectUserId';
import { GET_CREWUSERINFO_TIMESHEETS } from '@frontend/gql/queries/GetCrewUserInfoTimesheets';
import {
  GET_ADMIN_STATEMENTS,
  GET_CREW_STATEMENTS,
} from '@frontend/gql/queries/GetStatements';
import { GET_USER_ROLE_IN_PROJECT } from '@frontend/gql/queries/GetUserRoleInProject';
import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';
import {
  showErrorToast,
  showSuccessToast,
} from '@frontend/shared/design-system/molecules/toastUtils';
import CustomModal from '@frontend/shared/forms/molecules/CustomModal';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import ProjectNavbar from '@frontend/shared/navigation/components/navbar/ProjectNavbar';

import { TimesheetsForm } from '../forms/TimesheetsForm';
import {
  Timesheet,
  TimesheetFormValues,
  UserInfo,
  UserOption,
} from '../interfaces';
import TimesheetsTemplate from '../templates/TimesheetsTemplate';
import { formatTimeForParsing, toLocalISOString } from '../utils/timeUtils';

export function getAvailableCarsForProjectUserId(givenUser, allCarsOnProjectData) {
  const filteredCarsOnProject = allCarsOnProjectData?.projectUsers.filter(
    (projectUser) => projectUser.id === givenUser,
  );

  const carDetails = filteredCarsOnProject?.flatMap((projectUser) =>
    projectUser.car.map((car) => ({ id: car.id, name: car.name })),
  );

  return carDetails;
}

export function TimesheetPage() {
  const auth = useAuth();
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [addStatement] = useMutation(ADD_STATEMENT);
  const [editStatement] = useMutation(EDIT_STATEMENT);
  const [deleteStatement] = useMutation(DELETE_STATEMENT);
  const client = useApolloClient();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [timesheetIdToDelete, setTimesheetIdToDelete] = useState<string | null>(
    null,
  );
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);

  const {
    data: userInfoData,
    loading: userInfoLoading,
    error: userInfoError,
  } = useQuery(GET_CREWUSERINFO_TIMESHEETS, {
    skip: !auth.user,
    variables: { userId: auth.user?.id, projectId },
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      setUserInfo(data.projectUserDetails);
    },
  });

  const {
    data: roleData,
    loading: roleLoading,
    error: roleError,
  } = useQuery(GET_USER_ROLE_IN_PROJECT, {
    skip: !auth.user,
    variables: { userId: auth.user?.id, projectId },
    fetchPolicy: 'cache-and-network',
  });

  const {
    data: crewData,
    loading: crewLoading,
    error: crewError,
  } = useQuery(GET_CREW_STATEMENTS, {
    skip: !auth.user || roleData?.userRoleInProject !== 'CREW',
    variables: { projectUserId: userInfoData?.projectUserDetails?.id },
    fetchPolicy: 'cache-and-network',
  });

  const {
    data: adminData,
    loading: adminLoading,
    error: adminError,
  } = useQuery(GET_ADMIN_STATEMENTS, {
    skip: !auth.user || roleData?.userRoleInProject !== 'ADMIN',
    variables: { projectId },
    fetchPolicy: 'cache-and-network',
  });

  const {
    data: allProjectUsersData,
    loading: allProjectUsersLoading,
    error: allProjectUsersError,
  } = useQuery(GET_ALL_PROJECT_USERS, {
    variables: { projectId },
    fetchPolicy: 'cache-and-network',
  });

  const {
    data: allCarsOnProjectData,
    loading: allCarsOnProjectLoading,
    error: allCarsOnProjectError,
  } = useQuery(GET_ALL_CARS_ON_PROJECT_BY_PROJECTUSER_ID, {
    variables: { projectId },
    fetchPolicy: 'cache-and-network',
  });

  const {
    data: userCarsData,
    loading: userCarsLoading,
    error: userCarsError,
  } = useQuery(GET_CARS_BY_PROJECT_USER_ID, {
    variables: { projectUserId: selectedUser || userInfo?.id },
    skip: !selectedUser && !userInfo?.id,
    fetchPolicy: 'cache-and-network',
  });

  const carOptionsForLoggedInUser =
    userCarsData?.carsByProjectUserId?.map((car) => ({
      value: car.id,
      label: car.name,
    })) || [];

  const userOptionsForUserFilter =
    allProjectUsersData?.projectUsers
      ?.filter(
        (projectUser: { id: string; name: string; surname: string }) =>
          projectUser.id !== null,
      )
      .map((projectUser: { id: string; name: string; surname: string }) => ({
        value: projectUser.id,
        label: `${projectUser.name} ${projectUser.surname}`,
      })) || [];

  const userOptionsForAdminAddTimesheet =
    allProjectUsersData?.projectUsers
      ?.filter(
        (projectUser: { id: string; name: string; surname: string }) =>
          projectUser.id !== null,
      )
      .map((projectUser: { id: string; name: string; surname: string }) => ({
        value: projectUser.id,
        label: `${projectUser.name} ${projectUser.surname}`,
      })) || [];

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<UserOption[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimesheet, setSelectedTimesheet] = useState<Timesheet | null>(
    null,
  );
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [mode, setMode] = useState<'add' | 'edit'>('add');

  useEffect(() => {
    const today = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(today.getDate() - 3);
    setStartDate(toLocalISOString(threeDaysAgo).split('T')[0]);
    setEndDate(toLocalISOString(today).split('T')[0]);
  }, []);

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'start' | 'end',
  ) => {
    if (type === 'start') {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };

  const handleUserChange = (
    newValue: MultiValue<UserOption>,
    _actionMeta: ActionMeta<UserOption>,
  ) => {
    const selectedOptions = newValue as UserOption[];
    setSelectedUsers(selectedOptions);
  };

  const handleRowClick = (timesheet: Timesheet) => {
    setSelectedTimesheet(timesheet);
    setMode('edit');
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedTimesheet(null);
    setMode('add');
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTimesheet(null);
  };

  const handleDeleteClick = (id: string) => {
    setTimesheetIdToDelete(id);
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (timesheetIdToDelete) {
      try {
        await deleteTimesheet(timesheetIdToDelete);
        showSuccessToast('Timesheet deleted successfully.');
      } catch (error) {
        showErrorToast('Failed to delete timesheet. Please try again.');
      } finally {
        setTimesheetIdToDelete(null);
        setIsAlertOpen(false);
      }
    }
  };

  const deleteTimesheet = async (id: string) => {
    try {
      await deleteStatement({
        variables: { id },
        refetchQueries: [
          {
            query:
              userRole === 'ADMIN' ? GET_ADMIN_STATEMENTS : GET_CREW_STATEMENTS,
            variables:
              userRole === 'ADMIN'
                ? { projectId }
                : { projectUserId: userInfoData?.projectUserDetails?.id },
          },
        ],
      });
    } catch (error) {
      console.error('Error deleting statement:', error);
    }
  };

  const handleFormSubmit = (data: Timesheet) => {
    if (mode === 'add') {
      handleAddTimesheet(data);
    } else {
      handleEditTimesheet(data);
    }
    handleModalClose();
  };

  const handleFormSubmitWrapper = (data: TimesheetFormValues) => {
    console.log('WRAPPER', data.carId);
    console.log('selectedcar', selectedCar);
    const timesheet: Timesheet = {
      ...data,
      id: selectedTimesheet?.id || '',
      projectUser: selectedTimesheet?.projectUser || {
        id: data.projectUser.id,
        name: data.projectUser?.name || '',
        surname: data.projectUser?.surname || '',
      },
      create_date:
        selectedTimesheet?.create_date || toLocalISOString(new Date()),
      shift_lenght: data.shift_lenght || 0,
      car_id: data.carId || undefined,
      kilometers: data.kilometers,
    };
    handleFormSubmit(timesheet);
  };

  const handleAddTimesheet = async (data: Timesheet) => {
    try {
      const formattedFromTime = formatTimeForParsing(data.from);
      const formattedToTime = formatTimeForParsing(data.to);
      const variables = {
        project_user_id: data.projectUser.id,
        start_date: toLocalISOString(new Date(data.start_date)),
        from: toLocalISOString(
          new Date(`${data.start_date.split('T')[0]}T${formattedFromTime}`),
        ),
        to: toLocalISOString(
          new Date(`${data.start_date.split('T')[0]}T${formattedToTime}`),
        ),
        shift_lenght: Number(data.shift_lenght) || 0,
        calculated_overtime: data.calculated_overtime || 0,
        claimed_overtime: data.claimed_overtime || 0,
        car_id: data.car_id || null,
        kilometers: data.kilometers || null,
      };
      console.log('Adding statement:', variables);

      const response = await addStatement({
        variables,
        refetchQueries: [
          {
            query:
              userRole === 'ADMIN' ? GET_ADMIN_STATEMENTS : GET_CREW_STATEMENTS,
            variables:
              userRole === 'ADMIN'
                ? { projectId }
                : { projectUserId: userInfoData?.projectUserDetails?.id },
          },
        ],
      });
      const cacheData = client.readQuery({
        query:
          userRole === 'ADMIN' ? GET_ADMIN_STATEMENTS : GET_CREW_STATEMENTS,
        variables:
          userRole === 'ADMIN'
            ? { projectId }
            : { projectUserId: userInfoData?.projectUserDetails?.id },
      });
      const newTimesheet = {
        ...variables,
        id: response.data.addStatement.id,
        projectUser: userInfo,
      };
      client.writeQuery({
        query:
          userRole === 'ADMIN' ? GET_ADMIN_STATEMENTS : GET_CREW_STATEMENTS,
        variables:
          userRole === 'ADMIN'
            ? { projectId }
            : { projectUserId: userInfoData?.projectUserDetails?.id },
        data: {
          ...cacheData,
          statementsByProjectId:
            userRole === 'ADMIN'
              ? [...cacheData.statementsByProjectId, newTimesheet]
              : cacheData.statementsByProjectUserId
                ? [...cacheData.statementsByProjectUserId, newTimesheet]
                : [],
        },
      });
      showSuccessToast('Timesheet added successfully.');
    } catch (error) {
      console.error('Error adding statement:', error);
      showErrorToast('Failed to add timesheet. Please try again.');
    }
  };

  const handleEditTimesheet = async (data: Timesheet) => {
    try {
      console.log('Editing statement:', data);
      const formattedFromTime = formatTimeForParsing(data.from);
      const formattedToTime = formatTimeForParsing(data.to);
      const startDate = new Date(data.start_date);
      const fromTime = new Date(
        `${data.start_date.split('T')[0]}T${formattedFromTime}`,
      );
      const toTime = new Date(
        `${data.start_date.split('T')[0]}T${formattedToTime}`,
      );
      if (
        isNaN(startDate.getTime()) ||
        isNaN(fromTime.getTime()) ||
        isNaN(toTime.getTime())
      ) {
        throw new Error('Invalid date or time value');
      }
      const variables = {
        id: selectedTimesheet?.id || '',
        data: {
          project_user_id: userInfo?.id,
          start_date: toLocalISOString(startDate),
          from: toLocalISOString(fromTime),
          to: toLocalISOString(toTime),
          shift_lenght: Number(data.shift_lenght) || 0,
          calculated_overtime: data.calculated_overtime || 0,
          claimed_overtime: data.claimed_overtime || 0,
          last_update_date: toLocalISOString(new Date()),
          last_update_user_id: auth.user?.id,
          car_id: data.car_id || null,
          kilometers: data.kilometers || null,
        },
      };
      await editStatement({
        variables,
        refetchQueries: [
          {
            query:
              userRole === 'ADMIN' ? GET_ADMIN_STATEMENTS : GET_CREW_STATEMENTS,
            variables:
              userRole === 'ADMIN'
                ? { projectId }
                : { projectUserId: userInfoData?.projectUserDetails?.id },
          },
        ],
      });
      const cacheData = client.readQuery({
        query:
          userRole === 'ADMIN' ? GET_ADMIN_STATEMENTS : GET_CREW_STATEMENTS,
        variables:
          userRole === 'ADMIN'
            ? { projectId }
            : { projectUserId: userInfoData?.projectUserDetails?.id },
      });
      const updatedTimesheet = {
        ...variables.data,
        id: selectedTimesheet?.id || '',
        projectUser: userInfo,
      };
      client.writeQuery({
        query:
          userRole === 'ADMIN' ? GET_ADMIN_STATEMENTS : GET_CREW_STATEMENTS,
        variables:
          userRole === 'ADMIN'
            ? { projectId }
            : { projectUserId: userInfoData?.projectUserDetails?.id },
        data: {
          ...cacheData,
          statementsByProjectId:
            userRole === 'ADMIN'
              ? cacheData.statementsByProjectId.map((ts: Timesheet) =>
                  ts.id === selectedTimesheet?.id ? updatedTimesheet : ts,
                )
              : cacheData.statementsByProjectUserId.map((ts: Timesheet) =>
                  ts.id === selectedTimesheet?.id ? updatedTimesheet : ts,
                ),
        },
      });
      showSuccessToast('Timesheet updated successfully.');
    } catch (error) {
      console.error('Error editing statement:', error);
      showErrorToast('Failed to update timesheet. Please try again.');
    }
  };

  const isDataAvailable =
    roleData?.userRoleInProject &&
    (crewData?.statementsByProjectUserId || adminData?.statementsByProjectId) &&
    userInfoData?.projectUserDetails &&
    allProjectUsersData?.projectUsers &&
    allCarsOnProjectData?.cars;

  if (
    !isDataAvailable &&
    (roleLoading ||
      crewLoading ||
      adminLoading ||
      userInfoLoading ||
      allProjectUsersLoading ||
      allCarsOnProjectLoading)
  ) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading project details...</Text>
      </Center>
    );
  }

  if (
    roleError ||
    userInfoError ||
    crewError ||
    adminError ||
    allProjectUsersError ||
    allCarsOnProjectError ||
    !auth.user
  ) {
    return (
      <Center minHeight="100vh">
        <Text color="red.500">
          Error loading project details:{' '}
          {
            (roleError?.message,
            userInfoError?.message,
            crewError?.message,
            adminError?.message)
          }
        </Text>
      </Center>
    );
  }

  const userRole = roleData.userRoleInProject;

  if (userRole !== 'ADMIN' && userRole !== 'CREW') {
    navigate(route.myprojects());
    return null;
  }

  const timesheets =
    userRole === 'ADMIN'
      ? adminData?.statementsByProjectId
      : crewData?.statementsByProjectUserId;

  const filteredTimesheets = timesheets.filter((ts: Timesheet) => {
    const tsDate = new Date(ts.start_date).getTime();
    const isWithinDateRange =
      (!startDate || tsDate >= new Date(startDate).getTime()) &&
      (!endDate || tsDate <= new Date(endDate).getTime());

    const isUserSelected =
      selectedUsers.length === 0 ||
      selectedUsers.some(
        (user: UserOption) => user.value === ts.projectUser.id,
      );

    return isWithinDateRange && isUserSelected;
  });

  const sortedTimesheets = filteredTimesheets.sort(
    (a: Timesheet, b: Timesheet) => {
      const startDateA = new Date(a.start_date).getTime();
      const startDateB = new Date(b.start_date).getTime();

      if (startDateA !== startDateB) {
        return startDateB - startDateA;
      }
      const createDateA = new Date(a.create_date).getTime();
      const createDateB = new Date(b.create_date).getTime();
      return createDateB - createDateA;
    },
  );

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
        projectId={projectId!}
        projectName={userInfoData.projectUserDetails.project.name}
        userOptions={userOptionsForUserFilter}
        userRole={userRole}
        projectUserId={userInfoData.projectUserDetails.id}
        authUser={auth.user}
        selectedUsers={selectedUsers}
      />
      <Footer />
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={
          mode === 'add'
            ? 'Add Timesheet for ' +
              userInfoData.projectUserDetails.project.name
            : 'Edit Timesheet for ' +
              userInfoData.projectUserDetails.project.name
        }
        size="2xl"
      >
        <TimesheetsForm
          projectId={projectId!}
          initialValues={selectedTimesheet || undefined}
          // initialValues={{ ...selectedTimesheet, userCars }}
          onClose={handleModalClose}
          mode={mode}
          onSubmit={handleFormSubmitWrapper}
          userRole={userRole}
          userOptions={userOptionsForAdminAddTimesheet}
          userInfo={userInfo}
          // userCars={userCarsData}
          // setSelectedUser={setSelectedUser}
          setSelectedCar={setSelectedCar}
          allCarsOnProject={allCarsOnProjectData}
          carOptionsForLoggedInUser={carOptionsForLoggedInUser}
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
