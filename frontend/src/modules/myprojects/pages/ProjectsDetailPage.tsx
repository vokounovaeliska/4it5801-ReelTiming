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
import { FaCoins } from 'react-icons/fa6';
import { IoPerson } from 'react-icons/io5';
import { MdBuild } from 'react-icons/md';
import { useLocation, useParams } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';
import { ReactRouterLink } from '@frontend/shared/navigation/atoms';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage';

import { GET_PROJECT_DETAILS } from '../../../gql/queries/GetProjectDetails';
import { GET_USER_ROLE_IN_PROJECT } from '../../../gql/queries/GetUserRoleInProject';
import CrewMemberCount from '../CrewMemberCount';
import ProjectButtons from '../ProjectButtons';
import ProjectTimeline from '../ProjectTimeline';
import RecentCrewMembers from '../RecentCrewMembers';

export function MyProjectDetailPage() {
  const auth = useAuth();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { data, loading, error } = useQuery(GET_PROJECT_DETAILS, {
    variables: { id },
  });
  const {
    data: roleData,
    loading: roleLoading,
    error: roleError,
  } = useQuery(GET_USER_ROLE_IN_PROJECT, {
    skip: !auth.user,
    variables: { userId: auth.user?.id, projectId: id },
  });

  if (loading || roleLoading) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
      </Center>
    );
  }

  if (
    error ||
    roleError ||
    !auth.user ||
    !data?.project ||
    !roleData?.userRoleInProject
  ) {
    return <NotFoundPage />;
  }

  if (!id) {
    return <NotFoundPage />;
  }

  const project = data.project;
  const userRole = roleData.userRoleInProject;
  // const editPath = `/projects/${id}/edit`;

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgColor="gray.50"
    >
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
          projectId={id}
          activePath={location.pathname}
          userRole={userRole}
        />
      </Navbar>
      <Box
        flex="1"
        p={8}
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
            color="orange.500"
            mb={4}
            textAlign={{ base: 'center', md: 'left' }}
          >
            {project?.name}
          </Heading>
          <Box
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            textAlign={{ base: 'center', md: 'left' }}
          >
            <Text fontSize={{ base: 'md', md: 'lg' }}>
              {project?.description}
            </Text>
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
            <Text fontSize="lg">Number of crew members</Text>
            <HStack spacing={2} align="center" mb={4}>
              <IoPerson size="64px" />
              <Text fontSize="6xl">
                <CrewMemberCount projectId={project.id} userId={auth.user.id} />
              </Text>
            </HStack>
            <RecentCrewMembers projectId={project.id} userId={auth.user.id} />
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
          </Box>

          <Box
            p={6}
            bg="white"
            borderRadius="md"
            boxShadow="xs"
            flex="1"
            borderWidth={1}
          >
            <Text fontSize="lg">Total costs</Text>
            <HStack spacing={2} align="center" mb={4}>
              <FaCoins size="64px" />
              <Text fontSize="6xl">N/A</Text>
            </HStack>

            <Text mb={1}>Costs by category</Text>
            <HStack spacing={4} wrap="wrap" mb={3}>
              <Box
                flex="1"
                minW="200px"
                p={4}
                borderWidth="1px"
                borderRadius="md"
                textAlign="center"
              >
                <Text>Total labor costs</Text>
                <HStack spacing={2} align="center" justify="center">
                  {/* <MdOutlineWork />  IMPORT MD*/}
                  <Text fontSize="2xl">N/A</Text>
                </HStack>
              </Box>

              <Box
                flex="1"
                minW="200px"
                p={4}
                borderWidth="1px"
                borderRadius="md"
                textAlign="center"
              >
                <Text>Overtime costs</Text>
                <HStack spacing={2} align="center" justify="center">
                  {/* <FaMoon /> IMPORT FA*/}
                  <Text fontSize="2xl">N/A</Text>
                </HStack>
              </Box>
            </HStack>

            <HStack spacing={4} wrap="wrap" mb={4}>
              <Box
                flex="1"
                minW="200px"
                p={4}
                borderWidth="1px"
                borderRadius="md"
                textAlign="center"
              >
                <Text>Transportation costs</Text>
                <HStack spacing={2} align="center" justify="center">
                  {/* <FaCarSide /> IMPORT FA6*/}
                  <Text fontSize="2xl">N/A</Text>
                </HStack>
              </Box>

              <Box
                flex="1"
                minW="200px"
                p={4}
                borderWidth="1px"
                borderRadius="md"
                textAlign="center"
              >
                <Text>Equipment rental costs</Text>
                <HStack spacing={2} align="center" justify="center">
                  {/* <FaCamera /> IMPORT FA6*/}
                  <Text fontSize="2xl">N/A</Text>
                </HStack>
              </Box>
            </HStack>
            <Box
              display="flex"
              justifyContent={{ base: 'center', md: 'flex-start' }}
              mt={4}
            >
              <Button
                as={ReactRouterLink}
                to={route.timesheets(project.id)}
                leftIcon={<FaClock />}
                aria-label="Timesheets"
                colorScheme="orange"
                variant="outline"
                size={{ base: 'xl', md: 'lg' }}
                padding="16px 32px"
                fontSize={{ base: '2xl', md: 'xl' }}
                _hover={{ bg: 'orange.600', color: 'white' }}
              >
                Timesheets
              </Button>
            </Box>
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
        <Box mt={6}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <Button
              as={ReactRouterLink}
              to={route.crewList(project.id)}
              leftIcon={<FaUsers />}
              aria-label="View Crew List"
              colorScheme="orange"
              variant="outline"
              _hover={{ bg: 'orange.600', color: 'white' }}
            >
              Crew List
            </Button>
            <Button
              as={ReactRouterLink}
              to={route.timesheets(project.id)}
              leftIcon={<FaClock />}
              aria-label="Timesheets"
              colorScheme="orange"
              variant="outline"
              _hover={{ bg: 'orange.600', color: 'white' }}
            >
              Timesheets
            </Button>
            {userRole === 'ADMIN' && (
              <Button
                as={ReactRouterLink}
                to={route.editprojectpage(project.id)}
                leftIcon={<MdBuild />}
                aria-label="Edit Project"
                colorScheme="orange"
                variant="outline"
                _hover={{ bg: 'orange.600', color: 'white' }}
              >
                Edit Project
              </Button>
            )}
          </SimpleGrid>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
