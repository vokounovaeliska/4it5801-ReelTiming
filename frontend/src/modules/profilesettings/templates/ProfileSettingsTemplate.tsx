import React from 'react';
import { Box } from '@chakra-ui/react';

import { LoadingSpinner } from '@frontend/shared/design-system/atoms/LoadingSpinner';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import ProjectNavbar from '@frontend/shared/navigation/components/navbar/ProjectNavbar';

import ProfileSettingsForm from '../forms/ProfileSettingsForm';

interface ProfileSettingsTemplateProps {
  loading: boolean;
  error: Error | null;
  userData: {
    name: string;
    surname: string;
    email: string;
    phone_number: string;
    last_update_date: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const ProfileSettingsTemplate: React.FC<
  ProfileSettingsTemplateProps
> = ({ loading, error, userData, handleChange, handleSubmit }) => {
  if (loading) return <LoadingSpinner title="departments" />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <ProjectNavbar projectId={''} userRole={''} />
      <Box flex="1" p={4} width="100%" maxWidth="1200px" mx="auto">
        <ProfileSettingsForm
          userData={userData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Box>
      <Footer />
    </Box>
  );
};

export default ProfileSettingsTemplate;
