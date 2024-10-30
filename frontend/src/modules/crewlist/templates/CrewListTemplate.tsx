import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

import { CrewListForm } from '../forms/CrewListForm';

export type CrewListTemplateProps = {
  projectId: string;
};

export function CrewListTemplate({ projectId }: CrewListTemplateProps) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar children={undefined}></Navbar>
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Box textAlign="center" width="100%" maxWidth="1200px">
          <Heading mb={4}>Crew List for Project {projectId}</Heading>
          <CrewListForm
            projectId={projectId}
            onSubmit={function (): void {
              throw new Error('Function not implemented.');
            }}
            isLoading={false}
            departments={[]}
            mode={'edit'} // could cause a bug
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
