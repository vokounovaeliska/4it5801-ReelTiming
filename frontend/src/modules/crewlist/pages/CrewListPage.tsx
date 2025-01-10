import { Box, Center, Heading, Spinner, Text } from '@chakra-ui/react';

import {
  AllCarsOnProjectData,
  Car,
} from '@frontend/modules/timesheets/interfaces';
import {
  useAllCarsOnProjectByProjectUserId,
  useCarStatementsByProjectId,
} from '@frontend/modules/timesheets/pages/queryHooks';
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
  } = useCrewListPageUtils();

  const isDataAvailable = !!crewList && Object.keys(crewList).length > 0;
  const { allCarsOnProjectData, refetch: refetchAllCarsOnProjectData } =
    useAllCarsOnProjectByProjectUserId(projectId ?? '');

  const { projectCarStatements } = useCarStatementsByProjectId(projectId ?? '');

  if (!isDataAvailable && crewListLoading) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading project details...</Text>
      </Center>
    );
  }

  if (crewListError || !auth.user) {
    return (
      <Center minHeight="100vh">
        <Text color="red.500">
          Error loading project details: {crewListError?.message}
        </Text>
      </Center>
    );
  }

  const groupedByDepartment = crewList.projectUsers.reduce(
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

  const sortedDepartments = Object.keys(groupedByDepartment).sort();

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <ProjectNavbar
        projectId={projectId!}
        userRole={crewList.userRoleInProject}
      />
      <Box flex="1" p={0} width="100%">
        <Heading mb={4} mt={2} textAlign="center">
          Crew List for Project {crewList.project.name}
        </Heading>
        {crewList.userRoleInProject === 'ADMIN' && (
          <Box
            display={{ base: 'grid', md: 'flex' }}
            justifyContent={{ base: 'center', md: 'space-between' }}
            textAlign="center"
            alignItems="flex-end"
            mb={4}
            px={10}
          >
            <AddCrewMemberButton handleAddMemberClick={handleAddMemberClick} />
          </Box>
        )}
        <CrewListTable
          sortedDepartments={sortedDepartments}
          groupedByDepartment={groupedByDepartment}
          handleEditMemberClick={handleEditMemberClick}
          handleRemoveButtonClick={handleRemoveButtonClick}
          sendInvitation={sendInvitation}
          userRoleInProject={crewList.userRoleInProject}
          authUserId={auth.user?.id}
          projectCurrency={crewList.project?.currency}
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
          isLoading={isSubmitting}
          departments={crewList.departments}
          initialValues={selectedCrewMember || undefined}
          mode={selectedCrewMember ? 'edit' : 'add'}
          userRole={crewList.userRoleInProject}
          projectCurrency={crewList.project?.currency}
          cars={
            selectedCrewMember
              ? getAvailableCarsForProjectUserId(
                  selectedCrewMember?.id,
                  allCarsOnProjectData,
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
