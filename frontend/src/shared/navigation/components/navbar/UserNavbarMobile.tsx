import React from 'react';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';
import { AvatarPhoto } from '@frontend/shared/design-system';

import { RouterNavLink } from '../../atoms';

// UserNavbarMobile component displays the user interface for a logged-in user in the navigation bar.
// This component can be inserted into navbar.tsx and provides the following functionalities:
// 1. Displays the user's profile picture and name if they are logged in.
// 2. Offers options to log in or register if the user is not logged in.
// 3. Allows users to log out and navigate to the login page.
// This is the MOBILE view of the component.
const UserNavbarMobile: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {user ? (
        <>
          <Stack direction="row" alignSelf={'center'} py={8}>
            <Button
              bg={'none'}
              _hover={'none'}
              rounded={'md'}
              height={'6em'}
              as={RouterNavLink}
              colorScheme="orange"
              to={'/'} //todo userDetail
              py="4"
            >
              {
                //user.profileImageUrl &&
                <AvatarPhoto
                  src={
                    user?.profileImageUrl === null ? '' : user?.profileImageUrl
                  }
                />
              }
              <Box ml="2" display={{ base: 'none', sm: 'block' }}>
                {user?.name}
              </Box>
            </Button>
            <Box alignSelf={'center'}>
              <Button
                size={'sm'}
                as={RouterNavLink}
                onClick={() => {
                  signOut();
                  navigate(route.login());
                  window.location.reload();
                }}
                textColor={'white'}
              >
                Logout
              </Button>
            </Box>
          </Stack>
        </>
      ) : (
        <>
          <Stack
            direction="row"
            align="center"
            spacing={4}
            color={'white'}
            justify={'space-evenly'}
          >
            <Button
              as={RouterNavLink}
              size={'lg'}
              onClick={() => {
                navigate(route.login());
                window.location.reload();
              }}
              textColor={'white'}
            >
              Login
            </Button>
            <Text>or</Text>
            <Button
              as={RouterNavLink}
              size={'lg'}
              onClick={() => {
                navigate(route.register());
                window.location.reload();
              }}
              textColor={'white'}
            >
              Register
            </Button>
          </Stack>
        </>
      )}
    </>
  );
};

export default UserNavbarMobile;
