import React from 'react';
import { Box } from '@chakra-ui/react';

import { Heading } from '@frontend/shared/design-system';

import ShootingDaysList from '../atoms/ShootingDaysList';
import { Project } from '../interfaces/interface';

interface DailyReportTemplateProps {
  projectId: string;
  projectData?: Project;
}

const DailyReportTemplate: React.FC<DailyReportTemplateProps> = ({
  projectId,
  projectData,
}) => {
  return (
    <Box flex="1" width="100%" p={1} alignSelf="center">
      <Box
        justifyItems={{ base: 'center', sm: 'flex-start' }}
        py={{ base: '4', sm: '0' }}
      >
        <Heading mb={4} textAlign="center">
          Daily reports for Project {projectData?.name}
        </Heading>
        <ShootingDaysList projectId={projectId}></ShootingDaysList>
      </Box>
    </Box>
  );
};

export default DailyReportTemplate;
