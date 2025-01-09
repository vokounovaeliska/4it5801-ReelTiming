import { Box, Checkbox, Flex, Table, Tbody, Td, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';

import { GetShiftOverviewPageDataQuery } from '@frontend/gql/graphql';

import { ShiftOverviewHeader } from '../atoms/ShiftOverviewHeader';
import { ShiftWorkedReportedIcons } from '../atoms/ShiftWorkedReportedIcons';
import {
  getAllDatesBetween,
  groupUsersByDepartment,
} from '../utils/shiftOverviewUtils';

type Props = {
  data?: GetShiftOverviewPageDataQuery;
};

export const ShiftOverviewTable = ({ data }: Props) => {
  const days: Date[] = getAllDatesBetween(
    data?.project?.start_date,
    data?.project?.end_date,
  );

  const shootingDays = data?.shootingDaysByProject || [];

  const groupedUsers = groupUsersByDepartment(data?.projectUsers);

  const sortedDepartments = Object.keys(groupedUsers).sort(
    (a, b) => groupedUsers[a].orderIndex - groupedUsers[b].orderIndex,
  );

  return (
    <Box>
      <Table variant="simple">
        <ShiftOverviewHeader shootingDays={shootingDays} days={days} />
        <Tbody>
          {sortedDepartments.map((department) => (
            <>
              <Tr key={`department-${department}`}>
                <Td
                  colSpan={days.length + 2}
                  style={{ fontWeight: 'bold', textAlign: 'left' }}
                >
                  {department}
                </Td>
              </Tr>
              {groupedUsers[department]?.users.map((member) => (
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
                              format(day, 'yyyy-MM-dd'),
                        ),
                    );

                    const hasReported = member.statement?.some(
                      (report) =>
                        format(new Date(report.start_date), 'yyyy-MM-dd') ===
                        format(day, 'yyyy-MM-dd'),
                    );

                    return (
                      <Td key={day.toISOString()} textAlign="center">
                        <Flex align="center" gap={2}>
                          <Checkbox isChecked={hasWorked} colorScheme="gray" />
                          {hasWorked && (
                            <ShiftWorkedReportedIcons
                              hasWorked={hasWorked}
                              hasReported={hasReported}
                            />
                          )}
                        </Flex>
                      </Td>
                    );
                  })}
                </Tr>
              ))}
            </>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
