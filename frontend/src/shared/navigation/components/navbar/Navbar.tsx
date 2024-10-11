import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Stack,
  VStack,
} from '@chakra-ui/react';

import { route } from '@frontend/route';

import { ReactRouterLink } from '../../atoms';
import AppHeading from '../AppHeading';
import Logo from '../logo/Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box bg="#2D3748" p={4} color="white">
      <Flex align="center" justify={'flex-start'}>
        <Flex align={'center'}>
          <Logo />
          <AppHeading />
        </Flex>

        <Stack direction="row" display={{ base: 'none', md: 'flex' }}>
          <Button
            as={ReactRouterLink}
            to={route.login()} //todo route to myprojectspage
            colorScheme="orange"
            bg="orange.600"
            textColor={'white'}
            aria-label="Button going to My Projects page"
          >
            My Projects
          </Button>
          <Button
            as={ReactRouterLink}
            to={route.login()} //todo route to timesheet
            colorScheme="orange"
            bg="orange.600"
            textColor={'white'}
            aria-label="Button going to Timesheet page"
          >
            Timesheet
          </Button>
        </Stack>
        <Box display={{ base: 'block', md: 'none' }}>
          <>
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
                      <Button colorScheme="orange" onClick={toggleDrawer}>
                        My Projects
                      </Button>
                      <Button colorScheme="orange" onClick={toggleDrawer}>
                        Timesheet
                      </Button>
                    </VStack>
                  </DrawerBody>
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>
          </>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
