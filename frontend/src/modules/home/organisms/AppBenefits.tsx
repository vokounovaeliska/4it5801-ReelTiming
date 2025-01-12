import React from 'react';
import { Box } from '@chakra-ui/react';
import { FaClock, FaUsers } from 'react-icons/fa';
import { HiOutlineDocumentReport } from 'react-icons/hi';

import Benefit from '../molecules/Benefit';

const AppBenefits = () => (
  <Box
    display="flex"
    justifyContent="center"
    gap={8}
    mb={6}
    flexDirection={{ base: 'column', md: 'row' }}
  >
    <Benefit
      icon={FaClock}
      title="Save Time"
      description="Quickly report shifts from any device."
    />
    <Benefit
      icon={FaUsers}
      title="Manage Your Crew"
      description="Effortlessly manage your team in real time."
    />
    <Benefit
      icon={HiOutlineDocumentReport}
      title="Create Reports"
      description="Clear and with just a few clicks."
    />
  </Box>
);

export default AppBenefits;
