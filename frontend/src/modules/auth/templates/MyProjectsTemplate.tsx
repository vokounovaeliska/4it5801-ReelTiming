import { useState } from 'react';
import {
  Box,
  Center,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { AddProjectButton } from '@frontend/modules/myprojects/atoms/buttons/AddProjectButton';
import InactiveProjectsSection from '@frontend/modules/myprojects/atoms/InactiveProjectsSection';
import { Heading } from '@frontend/shared/design-system';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import ProjectNavbar from '@frontend/shared/navigation/components/navbar/ProjectNavbar';

import { AuthUser } from '../auth-core';

export type MyProjectsTemplateProps = {
  projects: {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    logo?: string | null;
  }[];
  onAddProject: () => void;
  user?: AuthUser | null;
};

export function MyProjectsTemplate({
  projects,
  onAddProject,
  user,
}: MyProjectsTemplateProps) {
  const boxBg = useColorModeValue('white', 'gray.700');
  const border = useColorModeValue('gray.300', 'gray.600');
  const textColor = useColorModeValue('2D3748', 'gray.100');
  const inactiveBoxBg = useColorModeValue('gray.200', 'gray.600');
  const inactiveTextColor = useColorModeValue('gray.500', 'gray.300');

  const activeProjects = projects.filter(
    (project) => project.isActive === true,
  );
  const inactiveProjects = projects.filter(
    (project) => project.isActive === false,
  );

  const [showInactiveProjects, setShowInactiveProjects] = useState(false);

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgColor={useColorModeValue('gray.50', 'gray.900')}
    >
      <ProjectNavbar projectId={''} userRole={''} />

      <Box flex="1" p={{ base: 4, md: 6 }}>
        <Box display="flex" justifyContent="center" alignItems="center" p="4">
          <Heading size="xxx-large" as="h1" textAlign={'center'}>
            My Projects
          </Heading>
        </Box>

        <Center pb="8">
          <AddProjectButton handleAddMemberClick={onAddProject} user={user} />
        </Center>

        <Box mb={6}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {activeProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Box
                  bg={boxBg}
                  borderRadius="md"
                  borderWidth={1}
                  borderColor={border}
                  p={6}
                  boxShadow="md"
                  _hover={{
                    boxShadow: 'md',
                    transform: 'scale(1.02)',
                    bg: 'orange.400',
                  }}
                  transition="all 0.3s ease"
                >
                  <Image
                    display={project.logo ? 'block' : 'none'}
                    src={`data:image/png;base64,${project.logo}`}
                    alt="Uploaded Logo"
                    w="300px"
                    h="75px"
                    justifySelf="center"
                    mb={4}
                  />
                  <Text
                    fontWeight="bold"
                    fontSize="lg"
                    color={textColor}
                    mb={4}
                    textAlign="center"
                  >
                    {project.name}
                  </Text>
                  <Text
                    fontSize="sm"
                    color={textColor}
                    textAlign="center"
                    noOfLines={2}
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {project.description || 'No description available'}
                  </Text>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </Box>
        {inactiveProjects.length > 0 && (
          <InactiveProjectsSection
            inactiveProjects={inactiveProjects}
            showInactiveProjects={showInactiveProjects}
            setShowInactiveProjects={setShowInactiveProjects}
            inactiveBoxBg={inactiveBoxBg}
            border={border}
            inactiveTextColor={inactiveTextColor}
          />
        )}
      </Box>
      <Footer />
    </Box>
  );
}
