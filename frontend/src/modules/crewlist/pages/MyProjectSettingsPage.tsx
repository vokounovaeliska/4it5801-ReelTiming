import { Box, Center, Spinner, Text } from '@chakra-ui/react';

import {
  AllCarsOnProjectData,
  Car,
} from '@frontend/modules/timesheets/interfaces';
import {
  useAllCarsOnProjectByProjectUserId,
  useCarStatementsByProjectId,
} from '@frontend/modules/timesheets/pages/queryHooks';
import { Heading } from '@frontend/shared/design-system';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import ProjectNavbar from '@frontend/shared/navigation/components/navbar/ProjectNavbar';

import { MyProjectSettingsForm } from '../forms/MyProjectSettingsForm';
import { CrewMemberData, ProjectUser } from '../interfaces/interfaces';

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

function getCurrentUserDetails(
  projectUsers: ProjectUser[],
  currentUserId: string,
): ProjectUser | null {
  const projectUser = projectUsers.find(
    (user: ProjectUser) => user.user?.id === currentUserId,
  );
  return projectUser || null;
}

export function MyProjectSettingPage() {
  const {
    auth,
    isSubmitting,
    projectId,
    crewListLoading,
    crewListError,
    crewList,
    handleUpdateCrewMember,
  } = useCrewListPageUtils();

  const isDataAvailable = !!crewList && Object.keys(crewList).length > 0;
  const {
    allCarsOnProjectData,
    refetch: refetchAllCarsOnProjectData,
    allCarsOnProjectLoading,
  } = useAllCarsOnProjectByProjectUserId(projectId ?? '');

  const { projectCarStatements } = useCarStatementsByProjectId(projectId ?? '');

  if (!isDataAvailable && crewListLoading) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading project details...</Text>
      </Center>
    );
  }

  if (allCarsOnProjectLoading) {
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

  const currentUser = getCurrentUserDetails(
    crewList?.projectUsers!,
    auth.user.id,
  );
  if (currentUser === null) {
    return (
      <Center minHeight="100vh">
        <Text color="red.500">Error loading current user details</Text>
      </Center>
    );
  }

  const castProjectUserIntoCrewMemberData = (projectUser: ProjectUser) => {
    return {
      id: projectUser.id,
      user_id: projectUser?.user!.id!,
      name: projectUser.name,
      surname: projectUser.surname,
      email: projectUser.email || '',
      phone_number: projectUser.phone_number,
      department: projectUser.department ? projectUser.department.id : '',
      position: projectUser.position ?? '',
      role: projectUser.role,
      is_active: projectUser.is_active || false,
      rate_id: projectUser.rate ? projectUser.rate.id : '',
      standard_rate: projectUser.rate?.standard_rate || 0,
      compensation_rate: projectUser.rate?.compensation_rate || 0,
      overtime_hour1: projectUser.rate?.overtime_hour1 || 0,
      overtime_hour2: projectUser.rate?.overtime_hour2 || 0,
      overtime_hour3: projectUser.rate?.overtime_hour3 || 0,
      overtime_hour4: projectUser.rate?.overtime_hour4 || 0,
      cars: projectUser.car ? projectUser.car : [],
    } as CrewMemberData;
  };

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
      </Box>
      <MyProjectSettingsForm
        onSubmit={async (data, sendIvite, cars, oldCars) => {
          await handleUpdateCrewMember(
            {
              ...data,
              id: currentUser.id,
              user_id: currentUser?.user?.id!,
              rate_id: currentUser.rate ? currentUser.rate.id : '',
              cars: cars,
            },
            oldCars,
          );
          refetchAllCarsOnProjectData();
        }}
        isLoading={isSubmitting}
        departments={crewList?.departments!}
        initialValues={
          castProjectUserIntoCrewMemberData(currentUser) || undefined
        }
        userRole={crewList?.userRoleInProject ?? 'CREW'}
        projectCurrency={crewList?.project?.currency}
        cars={
          currentUser
            ? getAvailableCarsForProjectUserId(
                currentUser.id,
                allCarsOnProjectData!,
              )
            : []
        }
        carStatements={projectCarStatements?.carStatementsByProjectId ?? []}
      />
      <Footer />
    </Box>
  );
}
