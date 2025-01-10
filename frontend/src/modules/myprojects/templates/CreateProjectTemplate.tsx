import { Box } from '@frontend/shared/design-system';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';
import { projectFormValues } from '@frontend/zod/schemas';

import { CreateProjectForm } from '../organisms/CreateProjectForm';

export type CreateProjectTemplateProps = {
  isLoading: boolean;
  error?: Error;
  onSubmit: (data: projectFormValues) => void;
};
export function CreateProjectTemplate({
  isLoading,
  error,
  onSubmit,
}: CreateProjectTemplateProps) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
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
        maxWidth={{ base: '100%', sm: '900px' }}
      >
        <Box textAlign="center" width="full">
          <CreateProjectForm
            isLoading={isLoading}
            errorMessage={error && error.message}
            onSubmit={onSubmit}
          ></CreateProjectForm>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
