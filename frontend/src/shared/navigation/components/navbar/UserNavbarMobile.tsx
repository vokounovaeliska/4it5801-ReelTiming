import React from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';

const UserNavbarMobile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {user ? (
        // <Stack direction="row" alignSelf={'center'} py={8}>
        //   <UserMenu />
        // </Stack>
        <Box></Box>
      ) : (
        <Stack
          direction="row"
          align="center"
          spacing={4}
          color={'white'}
          justify={'space-evenly'}
        >
          <Button
            onClick={() => {
              navigate(route.login());
              window.location.reload();
            }}
            textColor={'white'}
            size="lg"
          >
            Login
          </Button>
          <Box>or</Box>
          <Button
            onClick={() => {
              navigate(route.register());
              window.location.reload();
            }}
            textColor={'white'}
            size="lg"
          >
            Register
          </Button>
        </Stack>
      )}
    </>
  );
};

export default UserNavbarMobile;
