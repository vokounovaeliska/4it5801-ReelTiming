import { useQuery } from '@apollo/client';
import { Box, Center, Heading, Spinner, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import ProjectNavbar from '@frontend/shared/navigation/components/navbar/ProjectNavbar';
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage';
import { currencyUtil } from '@shared/currencyUtil';

import { GET_EVERYTHING_FOR_DASHBOARD } from '../../../gql/queries/GetEverythingForDashboard';
import BoxDashboard from '../BoxDashboard';
import CrewInfo from '../CrewInfo';
import DashboardCostsAdmin from '../DashboardCostsAdmin';
import DashboardEarningsCrew from '../DashboardEarningsCrew';
import PillButtonsTop from '../PillButtonsTop';
import ProjectOrigin from '../ProjectOrigin';
import ProjectStatus from '../ProjectStatus';
import ProjectTimeline from '../ProjectTimeline';
import ShiftInfo from '../ShiftInfo';
import TopDashButtons from '../TopDashButtons';

export function MyProjectDetailPage() {
  const auth = useAuth();
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery(GET_EVERYTHING_FOR_DASHBOARD, {
    variables: {
      id,
      userId: auth.user?.id || '',
      projectId: id,
      projectUserId: auth.user?.id || '',
    },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  const isDataAvailable =
    data?.project && data?.userRoleInProject && !loading && !error;

  if (!isDataAvailable) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading project details...</Text>
      </Center>
    );
  }

  if (error || !auth.user || !data?.project) {
    return <NotFoundPage />;
  }

  const project = data.project;
  const userRole = data.userRoleInProject;

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgColor="gray.50"
    >
      <ProjectNavbar projectId={id} userRole={userRole} />
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
          <PillButtonsTop userRole={userRole} projectId={project.id} />
          <Heading
            as="h2"
            size={{ base: 'xl', md: '2xl' }}
            mb={4}
            textAlign={{ base: 'center', md: 'left' }}
          >
            {project?.name}
          </Heading>
          <Box
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            textAlign={{ base: 'justify', md: 'left' }}
          >
            <Text fontSize={{ base: 'md', md: 'lg' }} maxWidth="58rem">
              {project?.description}
            </Text>
          </Box>
          <TopDashButtons userRole={userRole} projectId={project.id} />
        </BoxDashboard>

        <Box
          mb={6}
          display="flex"
          flexDirection={{ base: 'column', 'dash-break1': 'row' }} // PŮVODNĚ TU BYLO md: 'row'
          gap={4}
        >
          <BoxDashboard flex="1">
            {userRole === 'ADMIN' ? (
              <CrewInfo projectId={project.id} userId={auth.user.id} />
            ) : (
              <ShiftInfo projectId={project.id} userId={auth.user.id} />
            )}
          </BoxDashboard>

          <BoxDashboard flex="1">
            {userRole === 'ADMIN' ? (
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
            startDate={project.start_date}
            endDate={project.end_date}
          />
        </BoxDashboard>

        <BoxDashboard>
          <ProjectOrigin
            name={project?.name}
            company={project.production_company}
            currency={currencyUtil.getLabel(project.currency)}
            create_date={project.create_date}
            start_date={project.start_date}
            end_date={project.end_date}
          />

          <ProjectStatus isActive={project.is_active} />
        </BoxDashboard>
      </Box>
      <Footer />
    </Box>
  );
}
