import {
  Box,
  Checkbox,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { format } from 'date-fns';

import { GetShiftOverviewPageDataQuery } from '@frontend/gql/graphql';
import { Heading } from '@frontend/shared/design-system';

import { getAllDatesBetween } from '../utils/shiftOverviewUtils';

type Props = {
  data?: GetShiftOverviewPageDataQuery;
};

export const ShiftOverviewTable = ({ data }: Props) => {
  const days: Date[] = getAllDatesBetween(
    data?.project?.start_date,
    data?.project?.end_date,
  );

  const shootingDays = data?.shootingDaysByProject || [];

  const getShootingDayNumber = (date: Date) => {
    const shootingDay = shootingDays.find(
      (day) =>
        format(new Date(day.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'),
    );
    return shootingDay?.shooting_day_number || null;
  };
  return (
    <Box>
      <Box flex="1" pb={4}>
        <Heading as="h3" pb={4}>
          Shift overview: {data?.project?.name}
        </Heading>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Position</Th>
            <Th>Name</Th>
            {days.map((day) => (
              <Th key={day.toISOString()} textAlign="center">
                {format(day, 'dd.MM')} <br />
                {getShootingDayNumber(day) &&
                  `Day ${getShootingDayNumber(day)}`}
                <Checkbox mt={2} />
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data?.projectUsers?.map((member) => (
            <Tr key={member.id}>
              <Td>{member.position}</Td>
              <Td>
                {member.surname} {member.name}
              </Td>
              {days.map((day) => {
                const hasWorked = data?.shiftOverviewsByProjectId.some(
                  (shift) =>
                    shift.crew_working.some(
                      (crewMember) =>
                        crewMember.id === member.id &&
                        format(new Date(shift.date), 'yyyy-MM-dd') ===
                          format(day, 'yyyy-MM-dd'), // Kontrola shody datumu
                    ),
                );

                console.log(
                  'data?.shiftOverviewsByProjectId',
                  data?.shiftOverviewsByProjectId,
                );
                console.log('member.id', member.id);
                const hasReported = member.statement?.some(
                  (report) =>
                    format(new Date(report.start_date), 'yyyy-MM-dd') ===
                    format(day, 'yyyy-MM-dd'),
                );

                return (
                  <Td key={day.toISOString()} textAlign="center">
                    <Checkbox
                      isChecked={hasWorked}
                      // onChange={(e) => {
                      //   // Uložit změnu pro konkrétního člena
                      // }}
                    />
                    {hasReported ? (
                      <Box as="span" color="green.500">
                        ✅
                      </Box>
                    ) : hasWorked ? (
                      <Box as="span" color="orange.500">
                        ⚠️
                      </Box>
                    ) : null}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
