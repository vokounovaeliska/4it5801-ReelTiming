import { useState } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Checkbox,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
} from '@chakra-ui/react';

import { EditDepartmentsModal } from '@frontend/modules/departments/modals/EditDepartmentsModal';
import {
  AllCarsOnProjectData,
  Car,
} from '@frontend/modules/timesheets/interfaces';
import {
  useAllCarsOnProjectByProjectUserId,
  useCarStatementsByProjectId,
} from '@frontend/modules/timesheets/pages/queryHooks';
import { Heading } from '@frontend/shared/design-system';
import CustomModal from '@frontend/shared/forms/molecules/CustomModal';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import ProjectNavbar from '@frontend/shared/navigation/components/navbar/ProjectNavbar';

import { AddCrewMemberButton } from '../atoms/AddCrewMemberButton';
import { CrewListForm } from '../forms/CrewListForm';
import { ProjectUser } from '../interfaces/interfaces';
import CrewListTable from '../table/CrewListTable';

import CrewAlertDialog from './CrewAlertDialog';
import { useCrewListPageUtils } from './CrewListPageLogic';

function getAvailableCarsForProjectUserId(
  givenUser: string,
  allCarsOnProjectData: AllCarsOnProjectData,
): Car[] {
  const filteredCarsOnProject = allCarsOnProjectData?.projectUsers.filter(
    (projectUser) => projectUser.id === givenUser,
  );

  const carDetails = filteredCarsOnProject?.flatMap((projectUser) =>
    projectUser.car?.map((car: Car) => ({
      id: car.id,
      name: car.name,
      kilometer_allow: car.kilometer_allow,
      kilometer_rate: car.kilometer_rate,
    })),
  );
  console.log(carDetails?.filter((car): car is Car => car !== undefined) || []);
  return carDetails?.filter((car): car is Car => car !== undefined) || [];
}

const initialColumnVisibility = {
  surname: true,
  name: true,
  position: true,
  role: true,
  email: true,
  phone_number: true,
  standard_rate: true,
  compensation_rate: true,
  overtime_hour1: true,
  overtime_hour2: true,
  overtime_hour3: true,
  overtime_hour4: true,
};

export function CrewListPage() {
  const {
    auth,
    isSubmitting,
    isModalOpen,
    isAlertOpen,
    setIsAlertOpen,
    userIdToRemove,
    selectedCrewMember,
    projectId,
    crewListLoading,
    crewListError,
    crewList,
    handleModalClose,
    handleAddMemberClick,
    handleAddNewCrewMember,
    handleEditMemberClick,
    handleUpdateCrewMember,
    handleRemoveButtonClick,
    handleRemoveUser,
    sendInvitation,
    isEditDepartmentsModalOpen,
    setIsEditDepartmentsModalOpen,
    refetchCrew,
  } = useCrewListPageUtils();

  const [columnVisibility, setColumnVisibility] = useState(
    initialColumnVisibility,
  );

  const handleColumnVisibilityChange = (
    column: keyof typeof initialColumnVisibility,
  ) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const isDataAvailable = !!crewList && Object.keys(crewList).length > 0;
  const {
    allCarsOnProjectData,
    refetch: refetchAllCarsOnProjectData,
    allCarsOnProjectLoading,
  } = useAllCarsOnProjectByProjectUserId(projectId ?? '');

  const { projectCarStatements } = useCarStatementsByProjectId(projectId ?? '');

  if ((!isDataAvailable && crewListLoading) || allCarsOnProjectLoading) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading project details...</Text>
      </Center>
    );
  }

  if (crewListError || !auth.user || !crewList?.project) {
    return (
      <Center minHeight="100vh">
        <Text color="red.500">
          Error loading project details: {crewListError?.message}
        </Text>
      </Center>
    );
  }

  const groupedByDepartment = crewList?.projectUsers.reduce(
    (acc: Record<string, ProjectUser[]>, user: ProjectUser) => {
      if (
        crewList.userRoleInProject === 'ADMIN' ||
        (user.user && user.user.id === auth.user?.id)
      ) {
        const departmentName = user.department?.name || 'No Department';
        if (!acc[departmentName]) {
          acc[departmentName] = [];
        }
        acc[departmentName].push(user);
      }
      return acc;
    },
    {} as Record<string, ProjectUser[]>,
  );

  const sortedDepartments = Object.keys(groupedByDepartment);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <ProjectNavbar
        projectId={projectId!}
        userRole={crewList?.userRoleInProject}
      />
      <Box flex="1" p={0} width="100%">
        <Heading mb={4} mt={2} textAlign="center">
          Crew List for Project {crewList?.project?.name}
        </Heading>
        {crewList?.userRoleInProject === 'ADMIN' && (
          <Box
            display={{ base: 'grid', md: 'flex' }}
            justifyContent={{ base: 'center', md: 'space-between' }}
            textAlign="center"
            alignItems="flex-end"
            mb={4}
            px={10}
          >
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Select Columns
              </MenuButton>
              <MenuList>
                {Object.keys(initialColumnVisibility).map((column) => (
                  <MenuItem key={column}>
                    <Checkbox
                      isChecked={
                        columnVisibility[
                          column as keyof typeof initialColumnVisibility
                        ]
                      }
                      onChange={() =>
                        handleColumnVisibilityChange(
                          column as keyof typeof initialColumnVisibility,
                        )
                      }
                    >
                      {column.replace('_', ' ')}
                    </Checkbox>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <AddCrewMemberButton
              handleAddMemberClick={handleAddMemberClick}
              isShown={crewList.project?.is_active}
            />
            <Button
              onClick={() => setIsEditDepartmentsModalOpen(true)}
              colorScheme="orange"
            >
              Edit Departments
            </Button>
            <EditDepartmentsModal
              isOpen={isEditDepartmentsModalOpen}
              onClose={() => {
                setIsEditDepartmentsModalOpen(false);
                refetchCrew();
              }}
              projectId={projectId}
              userRole={crewList.userRoleInProject}
              projectName={crewList.project?.name}
            />
          </Box>
        )}
        <CrewListTable
          sortedDepartments={sortedDepartments}
          groupedByDepartment={groupedByDepartment!}
          handleEditMemberClick={handleEditMemberClick}
          handleRemoveButtonClick={handleRemoveButtonClick}
          sendInvitation={sendInvitation}
          userRoleInProject={crewList?.userRoleInProject!}
          project={crewList?.project!}
          columnVisibility={columnVisibility}
        ></CrewListTable>
      </Box>
      <Footer />
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={selectedCrewMember ? 'Edit Crew Member' : 'Add Crew Member'}
        size="6xl"
      >
        <CrewListForm
          projectId={projectId!}
          onSubmit={async (data, sendInvite, cars, oldCars) => {
            if (selectedCrewMember) {
              await handleUpdateCrewMember(
                {
                  ...data,
                  id: selectedCrewMember.id,
                  user_id: selectedCrewMember.user_id,
                  rate_id: selectedCrewMember.rate_id,
                  cars: cars,
                },
                oldCars,
              );
            } else {
              await handleAddNewCrewMember(
                { ...data, id: '', user_id: null, rate_id: null, cars: null },
                sendInvite,
                data.name,
                data.email,
              );
            }
            refetchAllCarsOnProjectData();
          }}
          isLoading={isSubmitting || allCarsOnProjectLoading}
          departments={crewList!.departments!}
          initialValues={selectedCrewMember ?? undefined}
          mode={selectedCrewMember ? 'edit' : 'add'}
          userRole={crewList!.userRoleInProject!}
          projectCurrency={crewList?.project?.currency!}
          cars={
            selectedCrewMember
              ? getAvailableCarsForProjectUserId(
                  selectedCrewMember?.id,
                  allCarsOnProjectData!,
                )
              : []
          }
          carStatements={projectCarStatements?.carStatementsByProjectId ?? []}
        />
      </CustomModal>
      <CrewAlertDialog
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={() => {
          if (userIdToRemove) {
            handleRemoveUser(userIdToRemove);
          }
          setIsAlertOpen(false);
        }}
      />
    </Box>
  );
}
