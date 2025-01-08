import { Select } from '@chakra-ui/react';

import { formatDateToDisplay } from '@frontend/modules/timesheets/utils/timeUtils';

import { ShootingDayByProject } from '../interfaces/interface';

interface ShootingDaySelectorProps {
  selectedShootingDay: string | null;
  setSelectedShootingDay: (id: string) => void;
  shootingDays: ShootingDayByProject[];
}

const ShootingDaySelector = ({
  selectedShootingDay,
  setSelectedShootingDay,
  shootingDays,
}: ShootingDaySelectorProps) => {
  const availableShootingDays = shootingDays.filter((day) => !day.dailyReport);

  return (
    <Select
      w={'xs'}
      placeholder="Select a Shooting Day"
      value={selectedShootingDay || ''}
      onChange={(e) => setSelectedShootingDay(e.target.value)}
    >
      {availableShootingDays.map((day) => (
        <option key={day.id} value={day.id}>
          {`Day ${day.shooting_day_number} - ${formatDateToDisplay(day.date)}`}
        </option>
      ))}
    </Select>
  );
};

export default ShootingDaySelector;
