import React from 'react';
import { Box, Button, Input } from '@chakra-ui/react';

export type CrewListFormProps = {
  projectId: string;
};

export function CrewListForm({ projectId: _projectId }: CrewListFormProps) {
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
      <Input placeholder="Full Name" mb={4} />
      <Input placeholder="Position" mb={4} />
      <Input placeholder="Email" mb={4} />
      <Button type="submit" colorScheme="orange" mr={3} width="100%">
        Add Member and Send Invitation
      </Button>
      <Button colorScheme="gray" width="100%" mt={2}>
        Add Member without Invitation
      </Button>
    </Box>
  );
}
