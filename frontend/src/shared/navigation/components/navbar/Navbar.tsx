import React from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  HamburgerIcon,
} from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Collapse,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';

import { ReactRouterLink } from '../../atoms';
import AppHeading from '../AppHeading';
import Logo from '../logo/Logo';

const Navbar: React.FC<{
  children1?: React.ReactNode;
}> = ({ children1 }) => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isUserSettingsOpen, setUserSettingsOpen] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setUserSettingsOpen(false);
  };

  const toggleUserSettings = () => {
    setUserSettingsOpen((prev) => !prev);
  };

  return (
    <Box bg="#2D3748" color="white">
      <Flex align="center" justify="space-between" px={4} py={2}>
        <Flex align="center">
          <Logo />
          <AppHeading />
          <Stack
            direction="row"
            display={{ base: 'none', md: 'flex' }}
            alignSelf="center"
            spacing={4}
            ml={4}
          >
            {user ? (
              <>
                <Button
                  as={ReactRouterLink}
                  to={route.myprojects()}
                  variant="ghost"
                  colorScheme="orange"
                  textColor="white"
                  aria-label="Button going to My Projects page"
                  bg={
                    location.pathname === route.myprojects()
                      ? 'orange.600'
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
              </>
            ) : null}
          </Stack>
        </Flex>
        <Box display={{ base: 'block', md: 'none' }}>
          <IconButton
            ref={btnRef}
            icon={<HamburgerIcon />}
            onClick={toggleDrawer}
            aria-label="Open Menu"
            colorScheme="orange"
            ml="auto"
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
                  <CloseButton onClick={toggleDrawer} color={'orange.500'} />
                </DrawerHeader>
                <DrawerBody display="flex" flexDirection="column" height="full">
                  <VStack spacing={2} flexGrow={1}>
                    {user ? (
                      <>
                        <Button
                          as={ReactRouterLink}
                          to={route.myprojects()}
                          colorScheme="orange"
                          onClick={toggleDrawer}
                          width="full"
                          mb={6}
                        >
                          My Projects
                        </Button>
                      </>
                    ) : (
                      <VStack spacing={4} align="center" width={'100%'}>
                        <Button
                          as={ReactRouterLink}
                          to={route.login()}
                          colorScheme="orange"
                          onClick={toggleDrawer}
                          width="full"
                        >
                          Login
                        </Button>
                        <Button
                          as={ReactRouterLink}
                          to={route.register()}
                          colorScheme="orange"
                          onClick={toggleDrawer}
                          width="full"
                        >
                          Register
                        </Button>
                      </VStack>
                    )}
                  </VStack>

                  <Flex flexDirection="column" mt="auto">
                    {user && (
                      <>
                        <Button
                          onClick={toggleUserSettings}
                          width="full"
                          variant="ghost"
                          rightIcon={
                            isUserSettingsOpen ? (
                              <ChevronUpIcon color={'orange'} />
                            ) : (
                              <ChevronDownIcon color={'orange'} />
                            )
                          }
                          colorScheme="orange"
                          _hover={{
                            bg: 'orange.700',
                            color: 'white',
                          }}
                        >
                          <Flex align="center">
                            <Avatar
                              src={user.profileImageUrl || ''}
                              name={user.name || 'Guest'}
                              size="30px"
                              boxSize={25}
                              bg={'orange.500'}
                              mr={2}
                            />
                            <Text fontSize="sm" fontWeight="bold" color="white">
                              {user.name || 'Guest'}
                            </Text>
                          </Flex>
                        </Button>
                        <Collapse in={isUserSettingsOpen}>
                          <VStack spacing={2} mt={2} align="stretch">
                            <Button
                              as={ReactRouterLink}
                              to={route.myprojects()}
                              colorScheme="orange"
                              onClick={toggleDrawer}
                            >
                              Settings
                            </Button>
                            <Button
                              as={ReactRouterLink}
                              to={route.myprojects()}
                              colorScheme="orange"
                              onClick={toggleDrawer}
                            >
                              Some other option
                            </Button>
                            <Divider />
                            <Button
                              as={ReactRouterLink}
                              to={route.myprojects()}
                              colorScheme="orange"
                              bgColor={'orange.700'}
                              _hover={{ bg: 'orange.800' }}
                              onClick={() => {
                                signOut();
                                navigate(route.login());
                              }}
                            >
                              Logout
                            </Button>
                          </VStack>
                        </Collapse>
                      </>
                    )}
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Box>

        <Flex display={{ base: 'none', md: 'flex' }} alignItems="center">
          {children1}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
