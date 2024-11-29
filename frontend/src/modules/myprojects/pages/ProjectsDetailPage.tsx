import { useQuery } from '@apollo/client';
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { FaClock, FaUsers } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
import { IoPerson } from 'react-icons/io5';
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
import CrewMemberCount from '../CrewMemberCount';
import DashboardCostsAdmin from '../DashboardCostsAdmin';
import DashboardEarningsCrew from '../DashboardEarningsCrew';
import ProjectTimeline from '../ProjectTimeline';
import RecentCrewMembers from '../RecentCrewMembers';
import RecentTimesheets from '../RecentTimesheets';

export function MyProjectDetailPage() {
  const auth = useAuth();
  const { id } = useParams<{ id: string }>();
  const {
    data,
    loading: dataLoading,
    error,
  } = useQuery(GET_PROJECT_DETAILS, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  const {
    data: roleData,
    loading: roleLoading,
    error: roleError,
  } = useQuery(GET_USER_ROLE_IN_PROJECT, {
    skip: !auth.user,
    variables: { userId: auth.user?.id, projectId: id },
    fetchPolicy: 'cache-and-network',
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
          base: '95%',
          sm: '95%',
          md: '90%',
          xl: '85%',
          '2xl': '75%',
        }}
        maxWidth="2000px"
        mx="auto"
        my={8}
        bg="white"
        boxShadow="xs"
        borderRadius="md"
        borderWidth={1}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          p={6}
          bg="white"
          boxShadow="base"
          borderRadius="md"
          borderWidth={1}
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
            //color="orange.500"
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
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              width={{ base: '100%', md: '75%' }}
            >
              {project?.description}
            </Text>
          </Box>
          <Box mt={5} justifyContent="space-between" width="100%">
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              {userRole === 'CREW' && (
                <Button
                  as={ReactRouterLink}
                  to={route.timesheets(project.id)}
                  leftIcon={<FaCirclePlus />}
                  aria-label="Submit shift times"
                  colorScheme="orange"
                  variant="outline"
                  _hover={{ bg: 'orange.600', color: 'white' }}
                  size={{ base: 'xl', md: 'md' }}
                  fontSize={{ base: '2xl', md: 'md' }}
                  padding="16px 32px"
                >
                  Report shift
                </Button>
              )}
              <Button
                as={ReactRouterLink}
                to={route.crewList(project.id)}
                leftIcon={<FaUsers />}
                aria-label={
                  userRole === 'CREW'
                    ? 'View and edit Personal Pay Rates'
                    : 'View Crew List'
                }
                colorScheme="orange"
                variant="outline"
                _hover={{ bg: 'orange.600', color: 'white' }}
                size={{ base: 'xl', md: 'md' }}
                fontSize={{ base: '2xl', md: 'md' }}
                padding="16px 32px"
              >
                {userRole === 'CREW' ? 'Personal Pay Rates' : 'Crew List'}
              </Button>
              <Button
                as={ReactRouterLink}
                to={route.timesheets(project.id)}
                leftIcon={<FaClock />}
                aria-label="Timesheets"
                colorScheme="orange"
                variant="outline"
                _hover={{ bg: 'orange.600', color: 'white' }}
                size={{ base: 'xl', md: 'md' }}
                fontSize={{ base: '2xl', md: 'md' }}
                padding="16px 32px"
              >
                Timesheets
              </Button>
            </SimpleGrid>
          </Box>
        </Box>

        <Box
          mb={6}
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          gap={4}
        >
          <Box
            p={6}
            bg="white"
            borderRadius="md"
            boxShadow="xs"
            flex="1"
            borderWidth={1}
          >
            {userRole === 'ADMIN' && (
              <>
                <Text fontSize="lg">Number of crew members</Text>
                <HStack spacing={2} align="center" mb={4}>
                  <IoPerson size="64px" />
                  <Box as="span" fontSize="6xl">
                    <CrewMemberCount
                      projectId={project.id}
                      userId={auth.user.id}
                    />
                  </Box>
                </HStack>
                <RecentCrewMembers
                  projectId={project.id}
                  userId={auth.user.id}
                />
                <Box
                  display="flex"
                  justifyContent={{ base: 'center', md: 'flex-start' }}
                  mt={4}
                >
                  <Button
                    as={ReactRouterLink}
                    to={route.crewList(project.id)}
                    leftIcon={<FaUsers />}
                    aria-label="View Crew List"
                    colorScheme="orange"
                    variant="outline"
                    size={{ base: 'xl', md: 'lg' }}
                    padding="16px 32px"
                    fontSize={{ base: '2xl', md: 'xl' }}
                    _hover={{ bg: 'orange.600', color: 'white' }}
                  >
                    Crew List
                  </Button>
                </Box>
              </>
            )}
            {userRole === 'CREW' && (
              <>
                <RecentTimesheets
                  projectId={project.id}
                  userId={auth.user.id}
                />
                <Box
                  display="flex"
                  justifyContent={{ base: 'center', md: 'flex-start' }}
                  mt={4}
                >
                  <Button
                    as={ReactRouterLink}
                    to={route.timesheets(project.id)}
                    leftIcon={<FaCirclePlus />}
                    aria-label="Submit shift times"
                    colorScheme="orange"
                    variant="outline"
                    size={{ base: 'xl', md: 'lg' }}
                    padding="16px 32px"
                    fontSize={{ base: '2xl', md: 'xl' }}
                    _hover={{ bg: 'orange.600', color: 'white' }}
                  >
                    Report Shift
                  </Button>
                </Box>
              </>
            )}
          </Box>

          <Box
            p={6}
            bg="white"
            borderRadius="md"
            boxShadow="xs"
            flex="1"
            borderWidth={1}
          >
            {userRole === 'ADMIN' ? (
              <DashboardCostsAdmin
                projectId={project.id}
                userId={auth.user.id}
              />
            ) : (
              <DashboardEarningsCrew
                projectId={project.id}
                userId={auth.user.id}
              />
            )}
          </Box>
        </Box>

        <Box
          p={6}
          bg="white"
          borderRadius="md"
          boxShadow="xs"
          borderWidth={1}
          mb={6}
        >
          <Text>Project timeline</Text>
          <ProjectTimeline projectId={project.id} />
        </Box>

        <Box p={6} bg="white" borderRadius="md" boxShadow="xs" borderWidth={1}>
          <Box position="relative" padding-bottom="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4">
              Origin
            </AbsoluteCenter>
          </Box>

          <Box
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            justifyContent="center"
            alignItems="center"
          >
            <Box flex="1" mr={4} p={4} display="flex" justifyContent="center">
              <Box textAlign="left">
                <Text fontSize="md" color="gray.600" mb={2}>
                  <Box as="span" mr={2} color="green.500">
                    🎬
                  </Box>
                  <strong>Project name:</strong> {project?.name || 'N/A'}
                </Text>
                <Text fontSize="md" color="gray.600" mb={2}>
                  <Box as="span" mr={2} color="green.500">
                    🏢
                  </Box>
                  <strong>Production Company:</strong>{' '}
                  {project.production_company || 'N/A'}
                </Text>
                <Text fontSize="md" color="gray.600" mb={2}>
                  <Box as="span" mr={2} color="green.500">
                    💰
                  </Box>
                  <strong>Project currency:</strong>{' '}
                  {currencyUtil.getLabel(project.currency)}
                </Text>
                <Text fontSize="md" color="gray.600" mb={2}>
                  <Box as="span" mr={2} color="blue.500">
                    🚀
                  </Box>
                  <strong>Start date:</strong>{' '}
                  {new Date(project.start_date).toLocaleDateString()}
                </Text>
                <Text fontSize="md" color="gray.600" mb={2}>
                  <Box as="span" mr={2} color="purple.500">
                    🏁
                  </Box>
                  <strong>End date:</strong>{' '}
                  {new Date(project.end_date).toLocaleDateString()}
                </Text>
              </Box>
            </Box>
            {userRole === 'ADMIN' && (
              <Box flex="1" p={4} display="flex" justifyContent="center">
                <Box textAlign="left">
                  <Text fontSize="md" color="gray.600" mb={2}>
                    <Box as="span" mr={2} color="green.500">
                      🗓️
                    </Box>
                    <strong>Created On:</strong>{' '}
                    {new Date(project.create_date).toLocaleDateString()}
                  </Text>
                  <Text fontSize="md" color="gray.600" mb={2}>
                    <Box as="span" mr={2} color="blue.500">
                      🧑
                    </Box>
                    <strong>Created By:</strong>{' '}
                    {project.create_user_id || 'Unknown'}
                  </Text>
                  <Text fontSize="md" color="gray.600" mb={2}>
                    <Box as="span" mr={2}>
                      🔄
                    </Box>
                    <strong>Last Updated On:</strong>{' '}
                    {new Date(project.last_update_date).toLocaleDateString()}
                  </Text>
                  <Text fontSize="md" color="gray.600" mb={2}>
                    <Box as="span" mr={2} color="purple.500">
                      🖋️
                    </Box>
                    <strong>Last Updated By:</strong>{' '}
                    {project.last_update_user_id || 'Unknown'}
                  </Text>
                </Box>
              </Box>
            )}
          </Box>

          <Box position="relative" paddingBottom="7">
            <Divider />
            <AbsoluteCenter bg="white" px="4">
              Status
            </AbsoluteCenter>
          </Box>
          <Text
            fontSize="md"
            color={project.is_active ? 'green.500' : 'red.500'}
            fontWeight="bold"
          >
            <Box as="span" mr={2}>
              {project.is_active ? '✅' : '❌'}
            </Box>
            <strong>Is Active:</strong> {project.is_active ? 'Yes' : 'No'}
          </Text>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
