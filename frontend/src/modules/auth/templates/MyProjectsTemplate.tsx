import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { PiProjectorScreenChart } from 'react-icons/pi';
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
  const border = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('2D3748', 'gray.100');

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgColor={useColorModeValue('gray.50', 'gray.900')}
    >
      <Navbar children1={<UserNavbar />} />

      <Box flex="1" p={{ base: 4, md: 6 }}>
        <Box display="flex" justifyContent="center" alignItems="center" p="6">
          <Flex align="center" gap={4}>
            <Box color={textColor}>
              <PiProjectorScreenChart size="40px" />
            </Box>{' '}
            <Heading
              as="h1"
              size="xl"
              textAlign="left"
              color={textColor}
              fontWeight="bold"
            >
              My Projects
            </Heading>
          </Flex>
        </Box>

        <Center pb="6">
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
              _hover={{
                bg: 'orange.500',
                color: 'white',
                transform: 'scale(1.2)',
              }}
              transition="all 0.3s ease"
            />
            <Box
              fontSize="sm"
              color={useColorModeValue('gray.500', 'gray.400')}
            >
              Add Project
            </Box>
          </VStack>
        </Center>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={10}>
          {projects.map((project) => (
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
                boxShadow="sm"
                _hover={{
                  boxShadow: 'md',
                  transform: 'scale(1.02)',
                  bg: 'orange.400',
                }}
                transition="all 0.3s ease"
              >
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
      <Footer />
    </Box>
  );
}
