import React from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button } from '@chakra-ui/react';
import { MdBuild } from 'react-icons/md';
import { Link as ReactRouterLink } from 'react-router-dom';

import { route } from '@frontend/route';

interface PillButtonsTopProps {
  userRole: 'ADMIN' | 'CREW';
  projectId: string;
}

const PillButtonsTop: React.FC<PillButtonsTopProps> = ({
  userRole,
  projectId,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <Button
        as={ReactRouterLink}
        to={route.myprojects()}
        aria-label="Go back"
        leftIcon={<ArrowBackIcon />}
        size="sm"
        borderRadius="full"
        variant="outline"
        colorScheme="orange"
        _hover={{ bg: 'orange.600', color: 'white' }}
        mb={4}
        flex="1"
        maxW="fit-content"
      >
        <Box as="span" display={{ base: 'none', sm: 'inline' }}>
          Back to my projects
        </Box>
        <Box as="span" display={{ base: 'inline', sm: 'none' }}>
          Back
        </Box>
      </Button>

      {userRole === 'ADMIN' && (
        <Button
          as={ReactRouterLink}
          to={route.editprojectpage(projectId)}
          aria-label="Edit project"
          leftIcon={<MdBuild />}
          size="sm"
          borderRadius="full"
          variant="outline"
          colorScheme="orange"
          _hover={{ bg: 'orange.600', color: 'white' }}
          mb={4}
          flex="1"
          maxW="fit-content"
        >
          <Box as="span" display={{ base: 'none', sm: 'inline' }}>
            Edit Project
          </Box>
          <Box as="span" display={{ base: 'inline', sm: 'none' }}>
            Edit
          </Box>
        </Button>
      )}
    </Box>
  );
};

export default PillButtonsTop;
