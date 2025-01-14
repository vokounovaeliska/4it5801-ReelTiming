import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Collapse,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface InactiveProjectsSectionProps {
  inactiveProjects: {
    id: string;
    name: string;
    description: string;
  }[];
  showInactiveProjects: boolean;
  setShowInactiveProjects: (show: boolean) => void;
  inactiveBoxBg: string;
  border: string;
  inactiveTextColor: string;
}

const InactiveProjectsSection: React.FC<InactiveProjectsSectionProps> = ({
  inactiveProjects,
  showInactiveProjects,
  setShowInactiveProjects,
  inactiveBoxBg,
  border,
  inactiveTextColor,
}) => {
  return (
    <Box>
      <Box display="flex" alignItems="center" mb={4}>
        <Heading size="lg" as="h2" textAlign="left">
          Inactive Projects
        </Heading>
        <IconButton
          aria-label="Toggle Inactive Projects"
          icon={
            showInactiveProjects ? (
              <ChevronUpIcon color="black" fontWeight="bold" boxSize={5} />
            ) : (
              <ChevronDownIcon color="black" fontWeight="bold" boxSize={5} />
            )
          }
          onClick={() => setShowInactiveProjects(!showInactiveProjects)}
          variant="ghost"
          ml={2}
        />
      </Box>
      <Collapse in={showInactiveProjects}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {inactiveProjects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              style={{ textDecoration: 'none' }}
            >
              <Box
                bg={inactiveBoxBg}
                borderRadius="md"
                borderWidth={1}
                borderColor={border}
                p={6}
                boxShadow="md"
                _hover={{
                  boxShadow: 'none',
                  transform: 'none',
                  bg: 'gray.400',
                }}
                transition="all 0.3s ease"
              >
                <Text
                  fontWeight="bold"
                  fontSize="lg"
                  color={inactiveTextColor}
                  mb={4}
                  textAlign="center"
                >
                  {project.name}
                </Text>
                <Text
                  fontSize="sm"
                  color={inactiveTextColor}
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
      </Collapse>
    </Box>
  );
};

export default InactiveProjectsSection;
