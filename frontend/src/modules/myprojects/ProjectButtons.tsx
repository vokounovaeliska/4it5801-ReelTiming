import React from 'react';
import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import { CiViewTimeline } from 'react-icons/ci';
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdBuild, MdOutlineSummarize } from 'react-icons/md';


const ProjectButtons: React.FC = () => {
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

  const buttonStyleMobile = {
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
    <Box pb={0} bg="white.100">
      {/* Mobile buttons */}
      <VStack spacing={4} display={{ base: 'flex', md: 'none' }}>
        {/* <IconButton
          as={ReactRouterLink}
          to={route.myprojects()}
          aria-label="Go back btn"
          icon={<ArrowBackIcon />}
          size="sm"
          borderRadius="full"
          colorScheme="orange"
          _hover={{ bg: 'orange.600' }}
        /> */}
        <Button {...buttonStyleMobile} leftIcon={<CiViewTimeline />}>
          Timesheets
        </Button>
        <Button {...buttonStyleMobile} leftIcon={<MdOutlineSummarize />}>
          Dashboard
        </Button>
        <Button {...buttonStyleMobile} leftIcon={<FaPeopleGroup />}>
          Crewlist
        </Button>
        <Button {...buttonStyleMobile} leftIcon={<MdBuild />}>
          Edit
        </Button>
      </VStack>

      {/* Desktop buttons */}
      <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
        <Button {...buttonStyle} leftIcon={<CiViewTimeline />}>
          Timesheets
        </Button>
        <Button {...buttonStyle} leftIcon={<MdOutlineSummarize />}>
          Dashboard
        </Button>
        <Button {...buttonStyle} leftIcon={<FaPeopleGroup />}>
          Crewlist
        </Button>
        <Button {...buttonStyle} leftIcon={<MdBuild />}>
          Edit
        </Button>
      </HStack>
    </Box>
  );
};

export default ProjectButtons;
