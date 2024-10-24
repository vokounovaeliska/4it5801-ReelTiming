import { gql, useQuery } from '@apollo/client';
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useLocation, useParams } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';
import { ReactRouterLink } from '@frontend/shared/navigation/atoms';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage';

import ProjectButtons from '../ProjectButtons';

const GET_PROJECT_DETAIL = gql`
  query GetProjectDetail($id: String!) {
    project(id: $id) {
      id
      name
      description
      production_company
      start_date
      end_date
      create_date
      create_user_id
      last_update_date
      last_update_user_id
      is_active
    }
  }
`;

export function MyProjectDetailPage() {
  const auth = useAuth();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const { data, loading, error } = useQuery(GET_PROJECT_DETAIL, {
    variables: { id },
  });

  if (loading) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
      </Center>
    );
  }

  if (error || !auth.user || !data?.project) {
    return <NotFoundPage />;
  }

  if (!id) {
    return <NotFoundPage />;
  }

  const project = data.project;

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
        <ProjectButtons projectId={id} activePath={location.pathname} />
      </Navbar>
      <Box
        flex="1"
        p={8}
        width={{
          base: '90%',
          sm: '90%',
          md: '80%',
          xl: '70%',
          '2xl': '60%',
        }}
        maxWidth="1200px"
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
          mb={6}
        >
          <Button
            as={ReactRouterLink}
            to={route.myprojects()}
            aria-label="Go back"
            leftIcon={<ArrowBackIcon />}
            size="sm"
            borderRadius="full"
            variant={'outline'}
            colorScheme="orange"
            _hover={{ bg: 'orange.600', color: 'white' }}
            mb={4}
          >
            Back to my projects
          </Button>

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
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.700"
              mb={{ base: 2, md: 0 }}
              mr={{ md: 4 }}
            >
              <Box as="span" mr={2} color="teal.500">
                📅
              </Box>
              <strong>Start Date:</strong>{' '}
              {new Date(project.start_date).toLocaleDateString() || 'N/A'}
            </Text>

            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700">
              <Box as="span" mr={2} color="red.500">
                ⏳
              </Box>
              <strong>End Date:</strong>{' '}
              {project.end_date
                ? new Date(project.end_date).toLocaleDateString()
                : 'N/A'}
            </Text>
          </Box>
        </Box>

        <Box p={6} bg="white" borderRadius="md" boxShadow="xs">
          <Text fontSize="lg" mb={4} color="2D3748" fontWeight="bold">
            <Box as="span" mr={2} color="orange.400">
              🏢
            </Box>
            <strong>Production Company:</strong>{' '}
            {project.production_company || 'N/A'}
          </Text>

          <Text fontSize="md" mb={6} color="gray.700" fontStyle="italic">
            {project.description || 'No description available'}
          </Text>

          <Box position="relative" padding="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4">
              Origin
            </AbsoluteCenter>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            mb={6}
            alignItems="center"
          >
            <Box flex="1" mr={4} textAlign="center" p={4}>
              <Text fontSize="md" color="gray.600" mb={2}>
                <Box as="span" mr={2} color="green.500">
                  🗓️
                </Box>
                <strong>Created On:</strong>{' '}
                {new Date(project.create_date).toLocaleDateString()}
              </Text>

              <Text fontSize="md" color="gray.600">
                <Box as="span" mr={2} color="blue.500">
                  🧑‍💻
                </Box>
                <strong>Created By:</strong>{' '}
                {project.create_user_id || 'Unknown'}
              </Text>
            </Box>
            <Box textAlign="center" flex="1">
              <Text fontSize="md" color="gray.600" mb={2}>
                <Box as="span" mr={2} color="red.500">
                  ⏰
                </Box>
                <strong>Last Updated On:</strong>{' '}
                {new Date(project.last_update_date).toLocaleDateString()}
              </Text>

              <Text fontSize="md" color="gray.600">
                <Box as="span" mr={2} color="purple.500">
                  🖋️
                </Box>
                <strong>Last Updated By:</strong>{' '}
                {project.last_update_user_id || 'Unknown'}
              </Text>
            </Box>
          </Box>

          <Box position="relative" padding="10">
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
