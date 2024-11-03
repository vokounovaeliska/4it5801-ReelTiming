import { route } from '@frontend/route';
import { Box, Center, Paragraph } from '@frontend/shared/design-system';
import { RouterLink } from '@frontend/shared/navigation/atoms';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

import { LogInForm } from '../organisms/LogInForm';
import ProjectInvitationInfo from '../organisms/ProjectInvitationInfo';

export type LogInTemplateProps = {
  isLoading: boolean;
  error?: Error;
  onSubmit: (data: { email: string; password: string }) => void;
  token?: string | null;
  project: { name: string; description: string };
};
export function LogInTemplate({
  isLoading,
  error,
  onSubmit,
  token,
  project,
}: LogInTemplateProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgColor={'gray.50'}
    >
      <Navbar children={undefined} />
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflowY="auto"
        padding={{ base: '4', sm: '6', md: '8' }}
        mx={{ base: '0', sm: 'auto' }}
        width="100%"
        maxWidth={{ base: '100%', sm: '90%', md: '60%' }}
      >
        <Box textAlign="center" width="full">
          {project && <ProjectInvitationInfo name={project?.name} />}
          <LogInForm
            isLoading={isLoading}
            errorMessage={error && error.message}
            onSubmit={onSubmit}
          >
            <Center>
              <Paragraph>
                Don't have an account?
                <RouterLink
                  p={2}
                  to={`${route.register()}${token ? `?token=${token}` : ''}`}
                  fontWeight={'bold'}
                >
                  Sign up
                </RouterLink>
              </Paragraph>
            </Center>
          </LogInForm>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
