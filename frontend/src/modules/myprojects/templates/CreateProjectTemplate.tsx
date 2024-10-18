import { Box } from '@frontend/shared/design-system';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';
import UserNavbar from '@frontend/shared/navigation/components/navbar/UserNavbar';

import { CreateProjectForm, FormValues } from '../organisms/CreateProjectForm';

// import UserNavbar from '@frontend/shared/navigation/components/navbar/UserNavbar';
// import UserNavbarMobile from '@frontend/shared/navigation/components/navbar/UserNavbarMobile';

export type CreateProjectTemplateProps = {
  isLoading: boolean;
  error?: Error;
  onSubmit: (data: FormValues) => void;
};
export function CreateProjectTemplate({
  isLoading,
  error,
  onSubmit,
}: CreateProjectTemplateProps) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar children1={<UserNavbar />} />
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflowY="auto"
        padding={{ base: '4', sm: '6', md: '8' }}
        mx="auto"
      >
        <CreateProjectForm
          isLoading={isLoading}
          errorMessage={error && error.message}
          onSubmit={onSubmit}
        ></CreateProjectForm>
      </Box>
      <Footer />
    </Box>
  );
}
