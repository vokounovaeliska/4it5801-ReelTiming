import { useQuery } from '@apollo/client';
import { Box, Center, Image, Spinner, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { GET_PROJECT_DETAILS } from '@frontend/graphql/queries/GetProjectDetails';
import { GET_USER_ROLE_IN_PROJECT } from '@frontend/graphql/queries/GetUserRoleInProject';
import { useAuth } from '@frontend/modules/auth';
import { HomePage } from '@frontend/modules/home/pages/HomePage';
import { Heading } from '@frontend/shared/design-system';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import ProjectNavbar from '@frontend/shared/navigation/components/navbar/ProjectNavbar';
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage';
import { currencyUtil } from '@shared/currencyUtil';

import BoxDashboard from '../atoms/BoxDashboard';
import PillButtonsTop from '../molecules/PillButtonsTop';
import ProjectOrigin from '../molecules/ProjectOrigin';
import ProjectStatus from '../molecules/ProjectStatus';
import ProjectTimeline from '../molecules/ProjectTimeline';
import TopDashButtons from '../molecules/TopDashButtons';
import CrewInfo from '../organisms/CrewInfo';
import DashboardCostsAdmin from '../organisms/DashboardCostsAdmin';
import DashboardEarningsCrew from '../organisms/DashboardEarningsCrew';
import ShiftInfo from '../organisms/ShiftInfo';

export function MyProjectDetailPage() {
  const auth = useAuth();
  const { id } = useParams<{ id: string }>();
  const {
    data,
    loading: dataLoading,
    error,
  } = useQuery(GET_PROJECT_DETAILS, {
    variables: { id: id! },
    skip: !id,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  const {
    data: roleData,
    loading: roleLoading,
    error: roleError,
  } = useQuery(GET_USER_ROLE_IN_PROJECT, {
    skip: !auth.user || !id,
    variables: { userId: auth.user?.id!, projectId: id! },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  const isDataAvailable =
    roleData?.userRoleInProject &&
    data?.project &&
    !roleLoading &&
    !dataLoading &&
    !roleError &&
    !error;

  if (!auth.user) {
    return <HomePage />;
  }

  if (!isDataAvailable) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading project details...</Text>
      </Center>
    );
  }

  if (error || !data?.project) {
    return <NotFoundPage />;
  }

  const project = data.project;
  const userRole = roleData;

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgColor="gray.50"
    >
      <ProjectNavbar projectId={id} userRole={userRole.userRoleInProject} />
      <Box
        flex="1"
        p={{ base: 3, md: 8 }}
        width={{
          base: '100%',
          sm: '95%',
          md: '90%',
          xl: '85%',
          '2xl': '80%',
        }}
        maxWidth="2000px"
        mx="auto"
      >
        <BoxDashboard
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          mb={6}
        >
          <PillButtonsTop
            userRole={userRole.userRoleInProject ?? ''}
            projectId={project.id}
          />
          <Heading
            as="h2"
            size={{ base: 'xl', md: '2xl' }}
            mb={4}
            textAlign={{ base: 'center', md: 'left' }}
          >
            {project.name}
          </Heading>
          <Image
            display={project.logo ? 'block' : 'none'}
            src={project.logo ? `data:image/png;base64,${project.logo}` : ''}
            alt="Uploaded Logo"
            w="400px"
            h="100px"
            objectFit="contain"
            objectPosition={{ base: 'center', md: 'left' }}
            ml={1}
            mb={4}
          />
          <Box
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            textAlign={{ base: 'justify', md: 'left' }}
          >
            <Text fontSize={{ base: 'md', md: 'lg' }} maxWidth="58rem">
              {project.description}
            </Text>
          </Box>
          <TopDashButtons
            userRole={userRole.userRoleInProject ?? ''}
            projectId={project.id}
          />
        </BoxDashboard>

        <Box
          mb={6}
          display="flex"
          flexDirection={{ base: 'column', 'dash-break1': 'row' }}
          gap={4}
        >
          <BoxDashboard flex="1">
            {userRole.userRoleInProject === 'ADMIN' ? (
              <CrewInfo
                projectId={project.id}
                userId={auth.user.id}
                projectUsers={data.project.projectUsers}
              />
            ) : (
              <ShiftInfo projectId={project.id} userId={auth.user.id} />
            )}
          </BoxDashboard>

          <BoxDashboard flex="1">
            {userRole.userRoleInProject === 'ADMIN' ? (
              <DashboardCostsAdmin
                projectId={project.id}
                currency={project.currency}
              />
            ) : (
              <DashboardEarningsCrew
                projectId={project.id}
                userId={auth.user.id}
                currency={project.currency}
              />
            )}
          </BoxDashboard>
        </Box>

        <BoxDashboard mb={6}>
          <ProjectTimeline
            startDate={project.start_date!}
            endDate={project.end_date!}
          />
        </BoxDashboard>

        <BoxDashboard>
          <ProjectOrigin
            name={project.name}
            company={project.production_company}
            currency={currencyUtil.getLabel(project.currency)}
            create_date={project.create_date}
            start_date={project.start_date!}
            end_date={project.end_date!}
          />

          <ProjectStatus isActive={project.is_active} />
        </BoxDashboard>
      </Box>
      <Footer />
    </Box>
  );
}
