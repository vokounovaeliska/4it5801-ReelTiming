import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import { route } from '@frontend/route';
import { ReactRouterLink } from '@frontend/shared/navigation/atoms';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

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
  const location = useLocation();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar>
        <Button
          as={ReactRouterLink}
          to={route.myprojects()}
          variant="ghost"
          colorScheme="orange"
          textColor="white"
          aria-label="Button going to My Projects page"
          bg={
            location.pathname === route.myprojects()
              ? 'orange.500'
              : 'transparent'
          }
          color="white"
          _hover={{
            bg: 'orange.700',
            color: 'white',
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)',
          }}
          _active={{
            bg: 'orange.500',
            color: 'white',
            boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.3)',
          }}
        >
          My Projects
        </Button>
      </Navbar>
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
