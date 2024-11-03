// AcceptInvitationTemplate.tsx
import { Box } from '@chakra-ui/react';

import { AuthUser } from '@frontend/modules/auth/auth-core';

import {
  AcceptInvitationForm,
  FormValues,
  ProjectUserData,
} from '../forms/AcceptInvitationForm';

export type AcceptInvitationTemplateProps = {
  onSubmit: (data: FormValues) => void;
  projectUserData: ProjectUserData;
  departments: { id: string; name: string }[];
  errorMessage?: string;
  isLoading: boolean;
  authUser: AuthUser;
};

export const AcceptInvitationTemplate = ({
  onSubmit,
  projectUserData,
  departments,
  errorMessage,
  isLoading,
  authUser,
}: AcceptInvitationTemplateProps) => (
  <Box
    display="flex"
    flexDirection="column"
    minHeight="100vh"
    bgColor={'gray.50'}
  >
    <Box
      flex="1"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflowY="auto"
      padding={{ base: '4', sm: '6', md: '8' }}
      mx={{ base: '0', sm: 'auto' }}
      maxWidth={{ base: '100%', sm: '90%', md: '90%', xl: '1300px' }}
    >
      <Box textAlign="center" width="full">
        <AcceptInvitationForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          departments={departments}
          errorMessage={errorMessage}
          projectUserData={projectUserData}
          authUser={authUser}
        />
      </Box>
    </Box>
  </Box>
);
