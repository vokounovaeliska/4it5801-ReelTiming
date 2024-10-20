import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Button, Center, Heading, Spinner, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { MyProjectsTemplate } from '@frontend/modules/auth/templates/MyProjectsTemplate';
import { route } from '@frontend/route';

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      description
    }
  }
`;

export function MyProjectsPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useQuery(GET_PROJECTS);

  useEffect(() => {
    if (!auth.user) {
      navigate(route.landingPage());
    }
  }, [auth.user, navigate]);

  if (loading) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading projects...</Text>
      </Center>
    );
  }

  if (error) {
    const isNetworkError = error.message.includes('Network error');

    return (
      <Center minHeight="100vh" flexDirection="column">
        <Heading as="h3" size="lg" color="red.500" mb={4}>
          Error fetching projects
        </Heading>
        <Text color="gray.600">
          {isNetworkError
            ? 'It seems there is an issue with the database connection. Please check your connection or try again later.'
            : `Error: ${error.message}`}
        </Text>
        <Button mt={4} onClick={() => refetch()} colorScheme="orange">
          Retry
        </Button>
      </Center>
    );
  }

  const projects =
    data?.projects?.map(
      (project: { id: string; name: string; description: string }) => ({
        id: project.id,
        name: project.name,
        description: project.description,
      }),
    ) || [];

  const handleAddProject = () => {
    navigate(route.createProject());
  };

  return (
    <MyProjectsTemplate projects={projects} onAddProject={handleAddProject} />
  );
}
