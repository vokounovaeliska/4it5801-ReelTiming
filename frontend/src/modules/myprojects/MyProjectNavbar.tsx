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
  HStack,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { CiViewTimeline } from 'react-icons/ci';
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdBuild, MdOutlineSummarize } from 'react-icons/md';

export const MyProjectNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  // const location = useLocation();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box pb={4} bg="white.100">
      <HStack
        spacing={4}
        display={{ base: 'none', md: 'flex' }}
        justifyContent="space-around"
      >
        <Button
          leftIcon={<CiViewTimeline />}
          colorScheme="orange"
          variant="ghost"
        >
          Timesheets
        </Button>
        <Button
          leftIcon={<MdOutlineSummarize />}
          colorScheme="orange"
          variant="ghost"
        >
          Dashboard
        </Button>
        <Button
          leftIcon={<FaPeopleGroup />}
          colorScheme="orange"
          variant="ghost"
        >
          Crewlist
        </Button>
        <Button leftIcon={<MdBuild />} colorScheme="orange" variant="ghost">
          Edit
        </Button>
      </HStack>
      <Box display={{ base: 'block', md: 'none' }}>
        <Flex justifyContent="flex-end">
          <IconButton
            ref={btnRef}
            icon={<HamburgerIcon />}
            onClick={toggleDrawer}
            aria-label="Open Menu"
            colorScheme="orange"
            ml="auto"
          />
        </Flex>
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
                  <>
                    <Button
                      leftIcon={<CiViewTimeline />}
                      colorScheme="orange"
                      variant="ghost"
                    >
                      Timesheets
                    </Button>
                    <Button
                      leftIcon={<MdOutlineSummarize />}
                      colorScheme="orange"
                      variant="ghost"
                    >
                      Dashboard
                    </Button>

                    <Button
                      leftIcon={<FaPeopleGroup />}
                      colorScheme="orange"
                      variant="ghost"
                    >
                      Crewlist
                    </Button>
                    <Button
                      leftIcon={<MdBuild />}
                      colorScheme="orange"
                      variant="ghost"
                    >
                      Edit
                    </Button>
                  </>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    </Box>
  );
};
