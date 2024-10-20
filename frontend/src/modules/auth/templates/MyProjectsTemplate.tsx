import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { route } from '@frontend/route';
import { RouterNavLink } from '@frontend/shared/navigation/atoms';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';
import UserNavbar from '@frontend/shared/navigation/components/navbar/UserNavbar';

export type MyProjectsTemplateProps = {
  projects: { id: string; name: string; description: string }[];
  onAddProject: () => void;
};

export function MyProjectsTemplate({
  projects,
  onAddProject,
}: MyProjectsTemplateProps) {
  const boxBg = useColorModeValue('white', 'gray.700');
  const hoverBg = useColorModeValue('orange.100', 'orange.600');

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgColor={useColorModeValue('gray.50', 'gray.800')}
    >
      <Navbar children1={<UserNavbar />} />
      <Box flex="1" p={{ base: 4, md: 6 }}>
        <Heading as="h1" size="lg" mb={6} textAlign="left">
          My Projects
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              style={{ textDecoration: 'none' }}
            >
              <Box
                bg={boxBg}
                borderRadius="md"
                borderWidth={2}
                borderColor="gray.300"
                p={6}
                boxShadow="lg"
                height="150px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                transition="background 0.2s ease"
                _hover={{ bg: hoverBg, transform: 'translateY(-5px)' }}
              >
                <Text fontWeight="bold" fontSize="xl" color="gray.800" mb={2}>
                  {project.name}
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.800"
                  textAlign="center"
                  overflow="hidden"
                  whiteSpace=""
                  textOverflow="ellipsis"
                  maxW="100%"
                >
                  {project.description}
                </Text>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
        <Center>
          <VStack spacing={3}>
            <IconButton
              aria-label="Add project"
              colorScheme="orange"
              as={RouterNavLink}
              to={route.createProject()}
              size="lg"
              icon={<AddIcon />}
              onClick={onAddProject}
              borderRadius="full"
              boxShadow="md"
            />
            <Box
              fontSize="sm"
              color={useColorModeValue('gray.500', 'gray.400')}
            >
              Add Project
            </Box>
          </VStack>
        </Center>
      </Box>
      <Footer />
    </Box>
  );
}
