import React from 'react';
import { FaClock } from 'react-icons/fa';

import { route } from '@frontend/route';

import DashButton from './DashButton';

interface ShiftsButtonProps {
  projectId: string;
}

const ShiftsButton: React.FC<ShiftsButtonProps> = ({ projectId }) => {
  return (
    <DashButton
      text="Shifts"
      icon={<FaClock />}
      ariaLabel="Shifts"
      to={route.timesheets(projectId)}
    />
  );
};

export default ShiftsButton;
