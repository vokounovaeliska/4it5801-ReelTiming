import React from 'react';
import { ButtonProps } from '@chakra-ui/react';
import { FaClock } from 'react-icons/fa';

import { route } from '@frontend/route';
import { ReactRouterLink } from '@frontend/shared/navigation/atoms';

import DashButton from './DashButton';

interface ShiftsButtonProps extends ButtonProps {
  projectId: string;
}

const ShiftsButton: React.FC<ShiftsButtonProps> = ({
  projectId,
  ...buttonProps
}) => {
  return (
    <DashButton
      text="Shifts"
      as={ReactRouterLink}
      icon={<FaClock />}
      ariaLabel="Shifts"
      to={route.timesheets(projectId)}
      {...buttonProps}
    />
  );
};

export default ShiftsButton;
