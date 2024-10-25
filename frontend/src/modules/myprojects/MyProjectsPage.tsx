import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Center, Spinner, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { MyProjectsTemplate } from '@frontend/modules/auth/templates/MyProjectsTemplate';
import { route } from '@frontend/route';

import { GET_USER_PROJECTS } from '../../gql/queries/GetUserProjects';

import ErrorMyProjectPage from './ErrorMyProjectPage';

export function MyProjectsPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useQuery(GET_USER_PROJECTS, {
    variables: { userId: auth.user?.id },
  });

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

  if (error && auth.user) {
    return (
      <ErrorMyProjectPage errorMessage={error.message} onRetry={refetch} />
    );
  }

  const projects =
    data?.userProjects?.map(
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
