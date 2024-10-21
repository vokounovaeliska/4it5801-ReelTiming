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
import { useParams } from 'react-router-dom';

import { route } from '@frontend/route';
import { ReactRouterLink } from '@frontend/shared/navigation/atoms';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';
import UserNavbar from '@frontend/shared/navigation/components/navbar/UserNavbar';
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
  const { id } = useParams<{ id: string }>();

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

  if (error || !data?.project) {
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
      <Navbar
        children1={<UserNavbar />}
        children2={<ProjectButtons />}
        drawerChildren={<ProjectButtons />}
      />
      <Box
        flex="1"
        p={8}
        width={{
          base: '100%',
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
        {/* <MyProjectNavbar /> */}
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
            mb={4} // Margin below the title for spacing
            textAlign={{ base: 'center', md: 'left' }}
          >
            {project?.name}
          </Heading>

          <Box
            display="flex" // Flexbox for dates
            flexDirection={{ base: 'column', md: 'row' }} // Stack on mobile, side by side on desktop
            textAlign={{ base: 'center', md: 'left' }} // Centered text on mobile
          >
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.700"
              mb={{ base: 2, md: 0 }} // Margin bottom on mobile
              mr={{ md: 4 }} // Margin right on desktop
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
