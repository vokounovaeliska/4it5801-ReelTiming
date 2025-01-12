import React from 'react';
import { Box } from '@chakra-ui/react';

import { Heading } from '@frontend/shared/design-system';

import ShootingDaysOverview from '../atoms/ShootingDaysOverview';
import { Project } from '../interfaces/interface';

interface DailyReportTemplateProps {
  projectData: Project;
}

const DailyReportTemplate: React.FC<DailyReportTemplateProps> = ({
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
        <ShootingDaysOverview project={projectData}></ShootingDaysOverview>
      </Box>
    </Box>
  );
};

export default DailyReportTemplate;
