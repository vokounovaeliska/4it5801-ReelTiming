import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface BenefitProps {
  icon: IconType;
  title: string;
  description: string;
}

const Benefit = ({ icon: Icon, title, description }: BenefitProps) => (
  <Box
    textAlign="center"
    flex="1"
    display="flex"
    flexDirection="column"
    alignItems="center"
  >
    <Box mb={3}>
      <Icon size={40} style={{ color: '#c05621' }} />
    </Box>
    <Text fontWeight="bold" color="orange.600">
      {title}
    </Text>
    <Text color="gray.700">{description}</Text>
  </Box>
);

export default Benefit;
