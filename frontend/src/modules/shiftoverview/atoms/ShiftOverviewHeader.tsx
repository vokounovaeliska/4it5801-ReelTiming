import {
  Box,
  Checkbox,
  SimpleGrid,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { format } from 'date-fns';

import { ShootingDay } from '@frontend/gql/graphql';

type ShiftOverviewHeaderProps = {
  days: Date[];
  shootingDays: ShootingDay[];
  onSelectAll: (day: Date, isChecked: boolean) => void;
};

export const ShiftOverviewHeader = ({
  days,
  shootingDays,
  onSelectAll,
}: ShiftOverviewHeaderProps) => {
  return (
    <Thead position="sticky" top={0} zIndex="docked" bg="white">
      <Tr>
        <Th
          style={{
            position: 'sticky',
            left: 0,
            zIndex: 1,
            backgroundColor: 'white',
          }}
        >
          Position
        </Th>
        <Th
          style={{
            position: 'sticky',
            left: 172,
            zIndex: 1,
            backgroundColor: 'white',
          }}
        >
          Name
        </Th>
        {days.map((day) => {
          const shootingDay = shootingDays.find(
            (sd) =>
              format(new Date(sd.date), 'yyyy-MM-dd') ===
              format(day, 'yyyy-MM-dd'),
          );

          return (
            <Th key={day.toISOString()} minW={20} alignItems="center">
              <SimpleGrid
                columns={1}
                alignItems="center"
                gap={1}
                fontSize={'small'}
              >
                <Text>{format(day, 'dd.MM')}</Text>
                <Box>
                  {shootingDay ? (
                    <Text>DAY {shootingDay.shooting_day_number}</Text>
                  ) : (
                    <Box height="1em" />
                  )}
                </Box>
                <Checkbox
                  my={1}
                  onChange={(e) => onSelectAll(day, e.target.checked)}
                  colorScheme="orange"
                >
                  <Text fontSize="small" color={'gray'}>
                    All
                  </Text>
                </Checkbox>
              </SimpleGrid>
            </Th>
          );
        })}
      </Tr>
    </Thead>
  );
};
