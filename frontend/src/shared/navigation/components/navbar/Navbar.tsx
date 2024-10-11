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
  Heading,
  IconButton,
  Image,
  Stack,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';

import { route } from '@frontend/route';

import { RouterNavLink } from '../../atoms';

import logo from './logo/logopng.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Box bg="#2D3748" p={4} color="white">
      <Flex align="center" justify={'flex-start'}>
        {/* Logo */}
        <Image src={logo} alt="Logo" boxSize="60px" mr={4} />
        {/* App Name */}
        <Heading as="h1" size="lg" color="white" mr={4}>
          ReelTiming
        </Heading>
        {/* Navigation Buttons */}
        <Stack direction="row" display={{ base: 'none', md: 'flex' }}>
          <Button
            as={RouterNavLink}
            to={route.login()}
            colorScheme="orange"
            bg="orange.600"
            textColor={'white'}
          >
            My Projects
          </Button>
          <Button colorScheme="orange" bg="orange.600" textColor={'white'}>
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
