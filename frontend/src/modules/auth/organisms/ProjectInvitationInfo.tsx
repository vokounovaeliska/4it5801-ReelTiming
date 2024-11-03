import React from 'react';
import { InfoIcon } from '@chakra-ui/icons';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';

import { Paragraph } from '@frontend/shared/design-system';

const ProjectInvitationInfo = (project: { name: string }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        width={{ base: '100%', sm: '350px', md: '450px', lg: '500px' }}
        maxWidth={'500px'}
        p={2}
        borderRadius="md"
        bg="gray.50"
        borderWidth={1}
        boxShadow="sm"
        borderColor="gray.200"
      >
        <Flex alignItems="center">
          <Icon as={InfoIcon} color="orange.500" boxSize={4} m={2} />
          <Text fontWeight="bold" color="gray.800">
            Project Invitation
          </Text>
        </Flex>
        <Paragraph fontSize="sm" color="gray.700" textAlign={'left'}>
          You've been invited to join the project{' '}
          <Text
            as="span"
            fontWeight="bold"
            color="orange.600"
            textTransform="uppercase"
          >
            {project?.name}
          </Text>
          . Please login or sign up to proceed.
        </Paragraph>
      </Box>
    </Box>
  );
};

export default ProjectInvitationInfo;
