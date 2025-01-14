import React, { ReactElement } from 'react';
import { Button } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

interface TopDashButtonProps {
  text: string;
  icon: ReactElement;
  ariaLabel: string;
  to: string;
}

const TopDashButton: React.FC<TopDashButtonProps> = ({
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
      _hover={{ bg: 'orange.600', color: 'white' }}
      size={{ base: 'xl', md: 'md' }}
      fontSize={{ base: '2xl', md: 'md' }}
      padding="16px 32px"
    >
      {text}
    </Button>
  );
};

export default TopDashButton;
