import { Box, Center, Heading, Text } from '@chakra-ui/react';

import Footer from '@frontend/shared/navigation/components/footer/Footer';
import ProjectNavbar from '@frontend/shared/navigation/components/navbar/ProjectNavbar';
import { projectFormValues } from '@frontend/zod/schemas';

import { EditProjectForm } from '../forms/EditProjectForm';
import { ShootingDay } from '../forms/ShootingDaysInputForm';
import { ProjectData } from '../pages/EditProjectPage';

export function EditProjectTemplate({
  project,
  projectId,
  onSubmit,
}: {
  project: ProjectData;
  projectId: string;
  onSubmit: (data: projectFormValues, shootingDays: ShootingDay[]) => void;
}) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <ProjectNavbar projectId={projectId!} userRole={'ADMIN'} />
      <Box
        flex="1"
        p={{ base: 4, md: 6 }}
        width="100%"
        maxWidth="1400px"
        mx="auto"
        bg="white"
      >
        <Heading
          mb={6}
          textAlign="center"
          fontSize={{ base: '2xl', md: '3xl' }}
        >
          Edit Project:{' '}
          <Text as="span" color="gray.700">
            {project?.name}
          </Text>
        </Heading>

        <Center>
          <EditProjectForm
            projectId={projectId}
            project={project}
            onSubmit={onSubmit}
          />
        </Center>
      </Box>

      <Footer />
    </Box>
  );
}
