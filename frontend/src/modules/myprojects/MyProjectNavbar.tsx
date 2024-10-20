import React from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, IconButton, VStack } from '@chakra-ui/react';
import { CiViewTimeline } from 'react-icons/ci';
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdBuild, MdOutlineSummarize } from 'react-icons/md';

import { route } from '@frontend/route';
import { ReactRouterLink } from '@frontend/shared/navigation/atoms';

export const MyProjectNavbar: React.FC = () => {
  return (
    <Box pb={4} bg="white.100">
      <VStack
        spacing={4}
        display={{ base: 'flex', md: 'none' }}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          as={ReactRouterLink}
          to={route.myprojects()}
          aria-label="Go back btn"
          icon={<ArrowBackIcon />}
          size="sm"
          borderRadius="full"
          colorScheme="orange"
          _hover={{ bg: 'orange.600' }}
        />
        <Button
          leftIcon={<CiViewTimeline />}
          colorScheme="orange"
          variant="ghost"
          color={'orange.500'}
          _hover={{ bg: 'orange.600', textColor: 'white' }}
        >
          Timesheets
        </Button>
        <Button
          leftIcon={<MdOutlineSummarize />}
          colorScheme="orange"
          variant="ghost"
          color={'orange.500'}
          _hover={{ bg: 'orange.600', textColor: 'white' }}
        >
          Dashboard
        </Button>
        <Button
          leftIcon={<FaPeopleGroup />}
          colorScheme="orange"
          variant="ghost"
          color={'orange.500'}
          _hover={{ bg: 'orange.600', textColor: 'white' }}
        >
          Crewlist
        </Button>
        <Button
          leftIcon={<MdBuild />}
          colorScheme="orange"
          variant="ghost"
          color={'orange.500'}
          _hover={{ bg: 'orange.600', textColor: 'white' }}
        >
          Edit
        </Button>
      </VStack>
      <HStack
        spacing={4}
        display={{ base: 'none', md: 'flex' }}
        justifyContent="space-around"
      >
        <IconButton
          as={ReactRouterLink}
          to={route.myprojects()}
          aria-label="Go back btn"
          icon={<ArrowBackIcon />}
          size="sm"
          borderRadius="full"
          colorScheme="orange"
          _hover={{ bg: 'orange.600' }}
        />
        <Button
          leftIcon={<CiViewTimeline />}
          colorScheme="orange"
          variant="ghost"
          color={'orange.500'}
          _hover={{ bg: 'orange.600', textColor: 'white' }}
        >
          Timesheets
        </Button>
        <Button
          leftIcon={<MdOutlineSummarize />}
          colorScheme="orange"
          variant="ghost"
          color={'orange.500'}
          _hover={{ bg: 'orange.600', textColor: 'white' }}
        >
          Dashboard
        </Button>
        <Button
          leftIcon={<FaPeopleGroup />}
          colorScheme="orange"
          variant="ghost"
          color={'orange.500'}
          _hover={{ bg: 'orange.600', textColor: 'white' }}
        >
          Crewlist
        </Button>
        <Button
          leftIcon={<MdBuild />}
          colorScheme="orange"
          variant="ghost"
          color={'orange.500'}
          _hover={{ bg: 'orange.600', textColor: 'white' }}
        >
          Edit
        </Button>
      </HStack>
    </Box>
  );
};
