import { AddIcon } from '@chakra-ui/icons';
import { Box, Center, Heading, IconButton, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { route } from '@frontend/route';
import { RouterNavLink } from '@frontend/shared/navigation/atoms';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';
import UserNavbar from '@frontend/shared/navigation/components/navbar/UserNavbar';

export type MyProjectsTemplateProps = {
  projects: string[];
  onAddProject: () => void;
};

export function MyProjectsTemplate({
  projects,
  onAddProject,
}: MyProjectsTemplateProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgColor={'gray.50'}
    >
      <Navbar children1={<UserNavbar />} />
      <Box flex="1" p={{ base: 4, md: 6 }}>
        <Heading as="h1" size="lg" mb={6} textAlign="left">
          My Projects
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
          {projects.map((project, index) => (
            <Link
              key={index}
              to={`/projects/${index}`}
              style={{ textDecoration: 'none' }}
            >
              <Box
                bg="gray.100"
                borderRadius="md"
                p={4}
                boxShadow="md"
                textAlign="center"
                height="100px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                _hover={{ bg: 'gray.200', cursor: 'pointer' }}
              >
                {project}
              </Box>
            </Link>
          ))}
        </SimpleGrid>

        <Center>
          <IconButton
            aria-label="Add project"
            colorScheme="orange"
            as={RouterNavLink}
            to={route.createProject()}
            size="lg"
            icon={<AddIcon />}
            onClick={onAddProject}
            borderRadius="full"
          />
          <Box mt={2} fontSize="sm" color="gray.500">
            Add Project
          </Box>
        </Center>
      </Box>
      <Footer />
    </Box>
  );
}
