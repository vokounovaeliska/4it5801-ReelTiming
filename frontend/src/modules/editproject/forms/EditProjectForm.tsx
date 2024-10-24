import React from 'react';
import { Box, Button, Input } from '@chakra-ui/react';

// export function EditProjectForm({ projectId }: { projectId: string }) {
export function EditProjectForm({
  projectId: _projectId,
}: {
  projectId: string;
}) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      mb={4}
      width="100%"
      maxWidth="600px"
      mx="auto"
    >
      <Input placeholder="Project Name" mb={4} />
      <Input placeholder="Project Description" mb={4} />
      <Button type="submit" colorScheme="orange" width="100%">
        Save Changes
      </Button>
    </Box>
  );
}
