import React from 'react';
import { AbsoluteCenter, Box, Divider, Text } from '@chakra-ui/react';

interface ProjectStatusProps {
  isActive: boolean;
}

const ProjectStatus: React.FC<ProjectStatusProps> = ({ isActive }) => {
  return (
    <>
      <Box position="relative" paddingBottom="7">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          Status
        </AbsoluteCenter>
      </Box>
      <Text
        fontSize="md"
        color={isActive ? 'green.500' : 'red.500'}
        fontWeight="bold"
      >
        <Box as="span" mr={2}>
          {isActive ? '✅' : '❌'}
        </Box>
        <strong>Is Active:</strong> {isActive ? 'Yes' : 'No'}
      </Text>
    </>
  );
};

export default ProjectStatus;
