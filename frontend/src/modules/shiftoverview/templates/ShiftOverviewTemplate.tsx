import React from 'react';
import { Box } from '@chakra-ui/react';

import { Project } from '@frontend/gql/graphql';
import { Heading } from '@frontend/shared/design-system';

interface ShiftOverviewTemplateProps {
  projectData?: Project;
}

export const ShiftOverviewTemplate: React.FC<ShiftOverviewTemplateProps> = ({
  projectData,
}) => {
  return (
    <Box flex="1" width="100%" p={1} alignSelf="center">
      <Box
        justifyItems={{ base: 'center', sm: 'flex-start' }}
        py={{ base: '4', sm: '0' }}
      >
        <Heading mb={4} textAlign="center">
          Shift overview for Project {projectData?.name}
        </Heading>
      </Box>
    </Box>
  );
};
