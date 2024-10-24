import React from 'react';
import { Box } from '@chakra-ui/react';

// export function TimesheetsForm({ projectId }: { projectId: string }) {
export function TimesheetsForm({
  projectId: _projectId,
}: {
  projectId: string;
}) {
  return <Box as="form" mb={4} width="100%" maxWidth="600px" mx="auto"></Box>;
}
