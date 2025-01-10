import React, { ReactElement } from 'react';
import { Button } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

interface DashButtonProps {
  text: string;
  icon: ReactElement;
  ariaLabel: string;
  to: string;
}

const DashButton: React.FC<DashButtonProps> = ({
  text,
  icon,
  ariaLabel,
  to,
}) => {
  return (
    <Button
      as={ReactRouterLink}
      to={to}
      leftIcon={icon}
      aria-label={ariaLabel}
      colorScheme="orange"
      variant="outline"
      size={{ base: 'xl', md: 'lg' }}
      padding="16px 32px"
      fontSize={{ base: '2xl', md: 'xl' }}
      _hover={{ bg: 'orange.600', color: 'white' }}
    >
      {text}
    </Button>
  );
};

export default DashButton;
