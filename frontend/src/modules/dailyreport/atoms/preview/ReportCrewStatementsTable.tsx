import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

import { formatTime } from '@frontend/modules/timesheets/utils/timeUtils';

import { DailyReportPreviewInfoQuery } from '../../interfaces/interface';

type DailyReportTableProps = {
  data?: DailyReportPreviewInfoQuery;
};

export const ReportCrewStatementsTable = ({ data }: DailyReportTableProps) => {
  const sortedStatements = [...(data?.statementsByProjectIdAndDate || [])].sort(
    (a, b) => {
      const orderA =
        a.projectUser.department?.order_index ?? Number.MAX_SAFE_INTEGER;
      const orderB =
        b.projectUser.department?.order_index ?? Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    },
  );

  return (
    <Box display="flex" gap={4}>
      <Box width="80%">
        <Table variant="unstyled" size="sm">
          <Thead>
            <Tr fontWeight={'bold'}>
              <Th width="22%">POSITION</Th>
              <Th width="22%">NAME</Th>
              <Th width="9%">CALL</Th>
              <Th width="9%">WRAP</Th>
              <Th width="6%">OT</Th>
              <Th width="16%">TURN AROUND</Th>
              <Th width="16%">NOTE</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedStatements.map((statement, index) => (
              <Tr key={index}>
                <Td>{statement.projectUser.position || 'N/A'}</Td>
                <Td>
                  {statement.projectUser.name} {statement.projectUser.surname}
                </Td>
                <Td>{formatTime(statement.from) || '-'}</Td>
                <Td>{formatTime(statement.to) || '-'}</Td>
                <Td>{statement.claimed_overtime || '0'}</Td>
                <Td></Td>
                <Td></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Box width="20%" mt={2} boxShadow="sm">
        <Text>TODO shooting progres metadata</Text>
      </Box>
    </Box>
  );
};
