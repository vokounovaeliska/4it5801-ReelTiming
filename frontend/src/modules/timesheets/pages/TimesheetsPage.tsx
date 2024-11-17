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
import {
  Link as ReactRouterLink,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { ActionMeta, MultiValue } from 'react-select';

import { ADD_STATEMENT } from '@frontend/gql/mutations/AddStatement';
import { DELETE_STATEMENT } from '@frontend/gql/mutations/DeleteStatement';
import { EDIT_STATEMENT } from '@frontend/gql/mutations/EditStatement';
import { GET_CREWUSERINFO_TIMESHEETS } from '@frontend/gql/queries/GetCrewUserInfoTimesheets';
import {
  GET_ADMIN_STATEMENTS,
  GET_CREW_STATEMENTS,
} from '@frontend/gql/queries/GetStatements';
import { GET_USER_ROLE_IN_PROJECT } from '@frontend/gql/queries/GetUserRoleInProject';
import { useAuth } from '@frontend/modules/auth';
import ProjectButtons from '@frontend/modules/myprojects/ProjectButtons';
import { route } from '@frontend/route';
import {
  showErrorToast,
  showSuccessToast,
} from '@frontend/shared/components/toastUtils';
import CustomModal from '@frontend/shared/forms/molecules/CustomModal';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

import { TimesheetsForm } from '../forms/TimesheetsForm';
import {
  Timesheet,
  TimesheetFormValues,
  UserInfo,
  UserOption,
} from '../interfaces';
import TimesheetsTemplate from '../templates/TimesheetsTemplate';
import {
  // formatTimeForDatabase,
  // formatTimeForDisplay,
  formatTimeForParsing,
  toLocalISOString,
} from '../utils/timeUtils';

export function TimesheetPage() {
  const auth = useAuth();
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
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

  const {
    data: userInfoData,
    loading: userInfoLoading,
    error: userInfoError,
  } = useQuery(GET_CREWUSERINFO_TIMESHEETS, {
    skip: !auth.user,
    variables: { userId: auth.user?.id, projectId },
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
  });

  const {
    data: crewData,
    loading: crewLoading,
    error: crewError,
  } = useQuery(GET_CREW_STATEMENTS, {
    skip: !auth.user || roleData?.userRoleInProject !== 'CREW',
    variables: { userId: auth.user?.id },
  });

  const {
    data: adminData,
    loading: adminLoading,
    error: adminError,
  } = useQuery(GET_ADMIN_STATEMENTS, {
    skip: !auth.user || roleData?.userRoleInProject !== 'ADMIN',
    variables: { projectId },
  });

  const userOptions = Array.from(
    new Set(
      adminData?.statementsByProjectId.map(
        (statement: Timesheet) => statement.projectUser.user.id,
      ) || [],
    ),
  ).map((userId) => {
    const user = adminData?.statementsByProjectId.find(
      (statement: Timesheet) => statement.projectUser.user.id === userId,
    )?.projectUser.user;
    return {
      value: user?.id || '',
      label: `${user?.name} ${user?.surname}`,
    };
  });

  const userOptionsForAdminAddTimesheet = Array.from(
    new Set(
      adminData?.statementsByProjectId.map(
        (statement: Timesheet) => statement.projectUser.id,
      ) || [],
    ),
  ).map((projectUserId) => {
    const projectUser = adminData?.statementsByProjectId.find(
      (statement: Timesheet) => statement.projectUser.id === projectUserId,
    )?.projectUser;
    return {
      value: projectUser?.id || '',
      label: `${projectUser?.user.name} ${projectUser?.user.surname}`,
    };
  });

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
    // setStartDate(threeDaysAgo.toISOString().split('T')[0]);
    setStartDate(toLocalISOString(threeDaysAgo).split('T')[0]);
    // setEndDate(today.toISOString().split('T')[0]);
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
              userRole === 'ADMIN' ? { projectId } : { userId: auth.user?.id },
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
    const timesheet: Timesheet = {
      ...data,
      id: selectedTimesheet?.id || '',
      projectUser: selectedTimesheet?.projectUser || {
        id: data.projectUser.id,
        user: { id: '', name: '', surname: '' },
      },
      // create_date: selectedTimesheet?.create_date || new Date().toISOString(),
      create_date:
        selectedTimesheet?.create_date || toLocalISOString(new Date()),
      shift_lenght: data.shift_lenght || 0,
    };
    handleFormSubmit(timesheet);
  };

  const handleAddTimesheet = async (data: Timesheet) => {
    try {
      const formattedFromTime = formatTimeForParsing(data.from);
      const formattedToTime = formatTimeForParsing(data.to);
      const variables = {
        project_user_id: data.projectUser.id,
        // start_date: new Date(data.start_date).toISOString(),
        start_date: toLocalISOString(new Date(data.start_date)),
        // from: new Date(
        //   `${data.start_date.split('T')[0]}T${formattedFromTime}`,
        // ).toISOString(),
        from: toLocalISOString(
          new Date(`${data.start_date.split('T')[0]}T${formattedFromTime}`),
        ),
        // to: new Date(
        //   `${data.start_date.split('T')[0]}T${formattedToTime}`,
        // ).toISOString(),
        to: toLocalISOString(
          new Date(`${data.start_date.split('T')[0]}T${formattedToTime}`),
        ),
        shift_lenght: Number(data.shift_lenght) || 0,
        calculated_overtime: data.calculated_overtime || 0,
        claimed_overtime: data.claimed_overtime || 0,
      };
      console.log('Adding statement:', variables);

      const response = await addStatement({
        variables,
        refetchQueries: [
          {
            query:
              userRole === 'ADMIN' ? GET_ADMIN_STATEMENTS : GET_CREW_STATEMENTS,
            variables:
              userRole === 'ADMIN' ? { projectId } : { userId: auth.user?.id },
          },
        ],
      });
      const cacheData = client.readQuery({
        query:
          userRole === 'ADMIN' ? GET_ADMIN_STATEMENTS : GET_CREW_STATEMENTS,
        variables:
          userRole === 'ADMIN' ? { projectId } : { userId: auth.user?.id },
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
          userRole === 'ADMIN' ? { projectId } : { userId: auth.user?.id },
        data: {
          ...cacheData,
          statementsByProjectId:
            userRole === 'ADMIN'
              ? [...cacheData.statementsByProjectId, newTimesheet]
              : cacheData.statementsByUserId
                ? [...cacheData.statementsByUserId, newTimesheet]
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
          // start_date: startDate.toISOString(),
          start_date: toLocalISOString(startDate),
          // from: fromTime.toISOString(),
          from: toLocalISOString(fromTime),
          // to: toTime.toISOString(),
          to: toLocalISOString(toTime),
          shift_lenght: Number(data.shift_lenght) || 0,
          calculated_overtime: data.calculated_overtime || 0,
          claimed_overtime: data.claimed_overtime || 0,
          // last_update_date: toLocalISOString(new Date()),
          last_update_date: toLocalISOString(new Date()),
          last_update_user_id: auth.user?.id,
        },
      };
      await editStatement({
        variables,
        refetchQueries: [
          {
            query:
              userRole === 'ADMIN' ? GET_ADMIN_STATEMENTS : GET_CREW_STATEMENTS,
            variables:
              userRole === 'ADMIN' ? { projectId } : { userId: auth.user?.id },
          },
        ],
      });
      const cacheData = client.readQuery({
        query:
          userRole === 'ADMIN' ? GET_ADMIN_STATEMENTS : GET_CREW_STATEMENTS,
        variables:
          userRole === 'ADMIN' ? { projectId } : { userId: auth.user?.id },
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
          userRole === 'ADMIN' ? { projectId } : { userId: auth.user?.id },
        data: {
          ...cacheData,
          statementsByProjectId:
            userRole === 'ADMIN'
              ? cacheData.statementsByProjectId.map((ts: Timesheet) =>
                  ts.id === selectedTimesheet?.id ? updatedTimesheet : ts,
                )
              : cacheData.statementsByUserId.map((ts: Timesheet) =>
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

  if (roleLoading || crewLoading || adminLoading || userInfoLoading) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading project details...</Text>
      </Center>
    );
  }

  if (
    roleError ||
    crewError ||
    adminError ||
    userInfoError ||
    !auth.user ||
    !roleData?.userRoleInProject
  ) {
    return (
      <Center minHeight="100vh">
        <Text color="red.500">
          Error loading project details:{' '}
          {roleError?.message || crewError?.message || adminError?.message}
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
      : crewData?.statementsByUserId;

  const filteredTimesheets = timesheets.filter((ts: Timesheet) => {
    const tsDate = new Date(ts.start_date).getTime();
    const isWithinDateRange =
      (!startDate || tsDate >= new Date(startDate).getTime()) &&
      (!endDate || tsDate <= new Date(endDate).getTime());

    const isUserSelected =
      selectedUsers.length === 0 ||
      selectedUsers.some(
        (user: UserOption) => user.value === ts.projectUser.user.id,
      );

    return isWithinDateRange && isUserSelected;
  });

  const sortedTimesheets = filteredTimesheets.sort(
    (a: Timesheet, b: Timesheet) => {
      const dateA = new Date(a.create_date).getTime();
      const dateB = new Date(b.create_date).getTime();
      return dateB - dateA;
    },
  );

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar>
        <Button
          as={ReactRouterLink}
          to={route.myprojects()}
          variant="ghost"
          colorScheme="orange"
          textColor="white"
          aria-label="Button going to My Projects page"
          bg={
            location.pathname === route.myprojects()
              ? 'orange.500'
              : 'transparent'
          }
          color="white"
          _hover={{
            bg: 'orange.700',
            color: 'white',
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)',
          }}
          _active={{
            bg: 'orange.500',
            color: 'white',
            boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.3)',
          }}
        >
          My Projects
        </Button>
        <ProjectButtons
          projectId={projectId!}
          activePath={location.pathname}
          userRole={userRole}
        />
      </Navbar>
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
        userOptions={userOptions}
        userRole={userRole}
        projectUserId={userInfoData.projectUserDetails.id}
        authUser={auth.user}
      />
      <Footer />
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={mode === 'add' ? 'Add Timesheet' : 'Edit Timesheet'}
        size="2xl"
      >
        <TimesheetsForm
          projectId={projectId!}
          initialValues={selectedTimesheet || undefined}
          onClose={handleModalClose}
          mode={mode}
          onSubmit={handleFormSubmitWrapper}
          userRole={userRole}
          userOptions={userOptionsForAdminAddTimesheet}
          userInfo={userInfo}
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
