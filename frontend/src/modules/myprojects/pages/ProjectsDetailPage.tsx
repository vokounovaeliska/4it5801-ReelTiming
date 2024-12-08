import { useQuery } from '@apollo/client';
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { FaClock, FaUsers } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
import { MdBuild } from 'react-icons/md';
import { useParams } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';
import { ReactRouterLink } from '@frontend/shared/navigation/atoms';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import ProjectNavbar from '@frontend/shared/navigation/components/navbar/ProjectNavbar';
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage';
import { currencyUtil } from '@shared/currencyUtil';

import { GET_PROJECT_DETAILS } from '../../../gql/queries/GetProjectDetails';
import { GET_USER_ROLE_IN_PROJECT } from '../../../gql/queries/GetUserRoleInProject';
import BoxDashboard from '../BoxDashboard';
import CrewInfo from '../CrewInfo';
import DashboardCostsAdmin from '../DashboardCostsAdmin';
import DashboardEarningsCrew from '../DashboardEarningsCrew';
import ProjectOrigin from '../ProjectOrigin';
import ProjectStatus from '../ProjectStatus';
import ProjectTimeline from '../ProjectTimeline';
import ShiftInfo from '../ShiftInfo';
import TopDashButton from '../TopDashButton';

export function MyProjectDetailPage() {
  const auth = useAuth();
  const { id } = useParams<{ id: string }>();
  const {
    data,
    loading: dataLoading,
    error,
  } = useQuery(GET_PROJECT_DETAILS, {
    variables: { id },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  const {
    data: roleData,
    loading: roleLoading,
    error: roleError,
  } = useQuery(GET_USER_ROLE_IN_PROJECT, {
    skip: !auth.user,
    variables: { userId: auth.user?.id, projectId: id },
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

  if (!isDataAvailable) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading project details...</Text>
      </Center>
    );
  }

  if (roleError || error || !auth.user || !data?.project) {
    return <NotFoundPage />;
  }

  const project = data.project;
  const userRole = roleData.userRoleInProject;

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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Button
              as={ReactRouterLink}
              to={route.myprojects()}
              aria-label="Go back"
              leftIcon={<ArrowBackIcon />}
              size="sm"
              borderRadius="full"
              variant="outline"
              colorScheme="orange"
              _hover={{ bg: 'orange.600', color: 'white' }}
              mb={4}
              flex="1"
              maxW="fit-content"
            >
              <Box as="span" display={{ base: 'none', sm: 'inline' }}>
                Back to my projects
              </Box>
              <Box as="span" display={{ base: 'inline', sm: 'none' }}>
                Back
              </Box>
            </Button>

            {userRole === 'ADMIN' && (
              <>
                <Button
                  as={ReactRouterLink}
                  to={route.editprojectpage(project.id)}
                  aria-label="Edit project"
                  leftIcon={<MdBuild />}
                  size="sm"
                  borderRadius="full"
                  variant="outline"
                  colorScheme="orange"
                  _hover={{ bg: 'orange.600', color: 'white' }}
                  mb={4}
                  flex="1"
                  maxW="fit-content"
                >
                  <Box as="span" display={{ base: 'none', sm: 'inline' }}>
                    Edit Project
                  </Box>
                  <Box as="span" display={{ base: 'inline', sm: 'none' }}>
                    Edit
                  </Box>
                </Button>
              </>
            )}
          </Box>

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
          <Box mt={5} justifyContent="space-between" width="100%">
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              {userRole === 'CREW' && (
                <>
                  <TopDashButton
                    text="Report shift"
                    icon={<FaCirclePlus />}
                    ariaLabel="Submit shift times"
                    to={route.timesheets(project.id)}
                  />
                </>
              )}
              <TopDashButton
                text={userRole === 'CREW' ? 'Personal Pay Rates' : 'Crew List'}
                icon={<FaUsers />}
                to={route.crewList(project.id)}
                ariaLabel={
                  userRole === 'CREW'
                    ? 'View and edit Personal Pay Rates'
                    : 'View Crew List'
                }
              />
              <TopDashButton
                text="Timesheets"
                icon={<FaClock />}
                ariaLabel="Timesheets"
                to={route.timesheets(project.id)}
              />
            </SimpleGrid>
          </Box>
        </BoxDashboard>

        <Box
          mb={6}
          display="flex"
          flexDirection={{ base: 'column', 'dash-break1': 'row' }} // PŮVODNĚ TU BYLO md: 'row'. KDYBY TO BYLO OŠKLIVÉ, PŘEPSAT NA PŮV.
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
