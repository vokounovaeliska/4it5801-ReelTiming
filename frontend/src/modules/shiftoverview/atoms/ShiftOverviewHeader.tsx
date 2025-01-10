import { Box, SimpleGrid, Text, Th, Thead, Tr } from '@chakra-ui/react';
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
    <Thead position="sticky" top={0} zIndex="docked" bg="white">
      <Tr>
        <Th>Position</Th>
        <Th>Name</Th>
        {days.map((day) => {
          const shootingDay = shootingDays.find(
            (sd) =>
              format(new Date(sd.date), 'yyyy-MM-dd') ===
              format(day, 'yyyy-MM-dd'),
          );

          return (
            <Th key={day.toISOString()} textAlign="center">
              <SimpleGrid columns={1} alignItems="center">
                <Text>{format(day, 'dd.MM')}</Text>
                <Box>
                  {shootingDay ? (
                    <Text>DAY {shootingDay.shooting_day_number}</Text>
                  ) : (
                    <Box height="1em" />
                  )}
                </Box>
              </SimpleGrid>
            </Th>
          );
        })}
      </Tr>
    </Thead>
  );
};
