import { Box, Center, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { GetPersonalProjectInfoQuery } from '@frontend/gql/graphql';
import { useAuth } from '@frontend/modules/auth';
import { CarStatement } from '@frontend/modules/timesheets/interfaces';
import { useCarStatementsByProjectUserId } from '@frontend/modules/timesheets/pages/queryHooks';
import { route } from '@frontend/route';
import { Heading } from '@frontend/shared/design-system';
import { LoadingSpinner } from '@frontend/shared/design-system/atoms/LoadingSpinner';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import ProjectNavbar from '@frontend/shared/navigation/components/navbar/ProjectNavbar';

import { MyProjectSettingsForm } from '../forms/MyProjectSettingsForm';
import { CrewMemberData } from '../interfaces/interfaces';
import { usePersonalProjectDataUtils } from '../utils/PersonalProjectDataUtils';

export function MyProjectSettingPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const {
    error,
    loading,
    roleData,
    personalProjectData,
    handleUpdateCrewMember,
    isSubmitting,
  } = usePersonalProjectDataUtils({ auth: auth?.user, projectId: projectId });

  const { projectStatementsCrew, projectCrewLoading } =
    useCarStatementsByProjectUserId(
      personalProjectData?.projectUserByUserIdAndProjectId?.id!,
    );

  const cleanedStatements: CarStatement[] =
    projectStatementsCrew?.carStatementsByProjectUserId
      ?.filter(
        (statement): statement is { car_id: string; kilometers: number } =>
          statement.car_id !== null &&
          statement.car_id !== undefined &&
          statement.kilometers !== null &&
          statement.kilometers !== undefined,
      )
      .map(({ car_id, kilometers }) => ({
        car_id,
        kilometers,
      })) || [];

  const currentUser = auth?.user;

  if (!auth.user) {
    navigate(route.landingPage());
  }

  if (loading || projectCrewLoading) {
    return <LoadingSpinner title="personal project setting" />;
  }

  if (error) {
    return (
      <Center minHeight="100vh">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  const castProjectUserIntoCrewMemberData = (
    personalProjectData?: GetPersonalProjectInfoQuery,
  ) => {
    const projectUser = personalProjectData?.projectUserByUserIdAndProjectId;
    return {
      id: projectUser?.id,
      user_id: projectUser?.user!.id!,
      name: projectUser?.name,
      surname: projectUser?.surname,
      email: projectUser?.email || '',
      phone_number: projectUser?.phone_number,
      department: projectUser?.department?.id ?? '',
      position: projectUser?.position ?? '',
      role: projectUser?.role,
      is_active: projectUser?.is_active || false,
      rate_id: projectUser?.rate?.id ?? '',
      standard_rate: projectUser?.rate?.standard_rate || 0,
      compensation_rate: projectUser?.rate?.compensation_rate || 0,
      overtime_hour1: projectUser?.rate?.overtime_hour1 || 0,
      overtime_hour2: projectUser?.rate?.overtime_hour2 || 0,
      overtime_hour3: projectUser?.rate?.overtime_hour3 || 0,
      overtime_hour4: projectUser?.rate?.overtime_hour4 || 0,
      cars: projectUser?.car ? projectUser.car : [],
    } as CrewMemberData;
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <ProjectNavbar
        projectId={projectId!}
        userRole={roleData?.userRoleInProject}
      />
      <Box flex="1" p={0} width="100%">
        <Heading mb={4} mt={2} textAlign="center">
          My project settings for {personalProjectData?.project?.name}
        </Heading>
      </Box>
      <MyProjectSettingsForm
        onSubmit={async (data, sendIvite, cars, oldCars) => {
          await handleUpdateCrewMember(
            {
              ...data,
              id: personalProjectData?.projectUserByUserIdAndProjectId?.id!,
              user_id: currentUser?.id!,
              rate_id:
                personalProjectData?.projectUserByUserIdAndProjectId?.rate
                  ?.id ?? '',
              cars: cars,
              department:
                personalProjectData?.projectUserByUserIdAndProjectId?.department
                  ?.name ?? '',
            },
            oldCars,
          );
        }}
        isLoading={isSubmitting}
        departments={personalProjectData?.project?.departments!}
        initialValues={
          castProjectUserIntoCrewMemberData(personalProjectData) || undefined
        }
        userRole={roleData?.userRoleInProject ?? 'CREW'}
        project={personalProjectData?.project}
        cars={personalProjectData?.projectUserByUserIdAndProjectId?.car ?? []}
        carStatements={cleanedStatements ?? []}
      />
      <Footer />
    </Box>
  );
}
