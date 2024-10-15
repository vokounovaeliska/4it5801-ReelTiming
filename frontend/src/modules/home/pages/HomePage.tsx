import React from 'react';
import { useQuery } from '@apollo/client';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Button,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  VStack,
} from '@chakra-ui/react';

import { gql } from '@frontend/gql';
import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';
import { Box } from '@frontend/shared/design-system';
import { ReactRouterLink } from '@frontend/shared/navigation/atoms';
import AppHeading from '@frontend/shared/navigation/components/AppHeading';
import Logo from '@frontend/shared/navigation/components/logo/Logo';
// import { TopNavigation } from '@frontend/shared/navigation/organisms/TopNavigation';

const EMPTY_QUERY = gql(/* GraphQL */ `
  query Quacks {
    _empty
  }
`);
// implemented to showcase navbar transformation after login showing username
export function HomePage() {
  const { user } = useAuth();
  const queryState = useQuery(EMPTY_QUERY);

  const [isOpen, setIsOpen] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <Box>
      <Box bg="#2D3748" p={4} color="white">
        <Flex align="center" justify={'flex-start'}>
          <Flex align={'center'}>
            <Logo />
            <AppHeading />
          </Flex>
          <Box
            ml="auto"
            display={{ base: 'none', md: 'block' }}
            textAlign="right"
          >
            {user ? <span>{user.name}</span> : <span>(not logged in)</span>}
          </Box>

          <Box display={{ base: 'block', md: 'none' }}>
            <IconButton
              ref={btnRef}
              icon={<HamburgerIcon />}
              onClick={toggleDrawer}
              aria-label="Open Menu"
              colorScheme="orange"
              ml={'auto'}
            />
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={toggleDrawer}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay>
                <DrawerContent bg="#2D3748">
                  <DrawerHeader>
                    <CloseButton onClick={toggleDrawer} />
                  </DrawerHeader>
                  <DrawerBody>
                    <VStack spacing={4} align="stretch">
                      <Button
                        as={ReactRouterLink}
                        to={route.login()} //todo route to myprojectspage
                        colorScheme="orange"
                      >
                        My Projects
                      </Button>
                      <Button
                        as={ReactRouterLink}
                        to={route.login()} //todo route to timesheet
                        colorScheme="orange"
                      >
                        Timesheet
                      </Button>
                    </VStack>
                  </DrawerBody>
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>
          </Box>
        </Flex>
      </Box>
      {/* <TopNavigation /> */}
      <Box p="8">
        <Box>
          TEMP NON-LOGGED IN USER LANDING PAGE UNTIL WE MAKE SOMETHING ULTRACOOL
        </Box>
        <Button
          as={ReactRouterLink}
          to={route.login()}
          colorScheme="orange"
          bg="orange.600"
          textColor={'white'}
        >
          Login
        </Button>
        <Button
          as={ReactRouterLink}
          to={route.register()}
          colorScheme="orange"
          bg="orange.600"
          textColor={'white'}
        >
          Register
        </Button>
        <Box>Hello: {user ? user.name : '(not logged in)'}</Box>
        <Box pt="4">GraphQL query result:</Box>
        <Box as="pre" fontFamily="mono">
          {JSON.stringify(queryState.data)}
        </Box>
      </Box>
    </Box>
  );
}
