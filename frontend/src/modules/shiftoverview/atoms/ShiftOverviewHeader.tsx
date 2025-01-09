import { SimpleGrid, Th, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';

import { ShootingDay } from '@frontend/gql/graphql';

type ShiftOverviewHeaderProps = {
  days: Date[];
  shootingDays: ShootingDay[];
};

export const ShiftOverviewHeader = ({
  days,
  shootingDays,
}: ShiftOverviewHeaderProps) => {
  return (
    <Tr>
      <Th>Position</Th>
      <Th>Name</Th>
      {days.map((day) => (
        <Th key={day.toISOString()} textAlign="center">
          <SimpleGrid columns={1}>
            {format(day, 'dd.MM')} <br />
            {shootingDays.some(
              (shootingDay) =>
                format(new Date(shootingDay.date), 'yyyy-MM-dd') ===
                format(day, 'yyyy-MM-dd'),
            ) &&
              `DAY ${
                shootingDays.find(
                  (shootingDay) =>
                    format(new Date(shootingDay.date), 'yyyy-MM-dd') ===
                    format(day, 'yyyy-MM-dd'),
                )?.shooting_day_number
              }`}
          </SimpleGrid>
        </Th>
      ))}
    </Tr>
  );
};
