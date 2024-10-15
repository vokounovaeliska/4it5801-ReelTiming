import React, { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Center, Heading, IconButton, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

const MyProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<string[]>([]);

  const handleAddProject = () => {
    setProjects([...projects, `New Project ${projects.length + 1}`]);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box as="header" width="100%" position="sticky" top={0} zIndex={10}>
        <Navbar />
      </Box>

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
            size="lg"
            icon={<AddIcon />}
            onClick={handleAddProject}
            borderRadius="full"
          />
        </Center>
      </Box>
      <Box as="footer" mt="auto" width="100%" bg="gray.800">
        <Footer />
      </Box>
    </Box>
  );
};

export default MyProjectsPage;
