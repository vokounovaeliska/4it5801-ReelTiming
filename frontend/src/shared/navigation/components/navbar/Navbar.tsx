import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import AppHeading from '../AppHeading';
import Logo from '../logo/Logo';

import UserMenu from './UserMenu';
import UserMenuMobile from './UserMenuMobile';

const Navbar: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const buttonStyle = {
    colorScheme: 'orange',
    variant: 'ghost',
    textColor: 'white',
    _hover: {
      bg: 'orange.700',
      color: 'white',
      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)',
    },
    _active: {
      bg: 'orange.500',
      color: 'white',
      boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.3)',
    },
  };

  return (
    <Box pb={0} bg="#2D3748" color="white">
      <HStack spacing={4} align="center" px={4} py={2}>
        <Flex align="center" flexShrink={0}>
          <Logo />
          <AppHeading />
        </Flex>
        <HStack
          spacing={4}
          display={{ base: 'none', 'admin-nav': 'flex' }}
          ml={0}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { ...buttonStyle });
            }
            return null;
          })}
        </HStack>

        <Flex
          display={{ base: 'none', 'admin-nav': 'flex' }}
          ml="auto"
          alignItems="center"
        >
          <UserMenu />
        </Flex>

        {/* Mobile menu button */}
        <IconButton
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          size="lg"
          display={{ base: 'block', 'admin-nav': 'none' }}
          onClick={onOpen}
          colorScheme="orange"
          ml="auto"
        />
      </HStack>

      {/* Drawer for mobile */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="#2D3748" color="white">
          <DrawerHeader>
            <CloseButton onClick={onClose} color={'orange.500'} />
          </DrawerHeader>
          <DrawerBody>
            <Flex direction="column" height="100%">
              <VStack spacing={4} align="stretch">
                {React.Children.map(children, (child) => {
                  if (React.isValidElement(child)) {
                    return React.cloneElement(child);
                  }
                  return null;
                })}
              </VStack>
              <UserMenuMobile />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
