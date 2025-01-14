import { Search2Icon } from '@chakra-ui/icons';
import {
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { formatDateToDisplay } from '@frontend/modules/timesheets/utils/timeUtils';

import { ShootingDayByProject } from '../interfaces/interface';

import DailyReportStatusIcon from './DailyReportStatusIcon';

type ShootingDaysTableProps = {
  shootingDays: ShootingDayByProject[];
  selectedDayId: string | null;
  onPreview: (day: ShootingDayByProject) => void;
};

function ShootingDaysTable({
  shootingDays,
  selectedDayId,
  onPreview,
}: ShootingDaysTableProps) {
  return (
    <TableContainer>
      <Table
        variant="simple"
        size="sm"
        colorScheme="gray"
        sx={{
          borderSpacing: 0,
          '& th, & td': {
            px: { base: 1, md: 2 },
          },
        }}
      >
        <Thead>
          <Tr>
            <Th>Day N.</Th>
            <Th>Date</Th>
            <Th>Status</Th>
            <Th>Preview</Th>
          </Tr>
        </Thead>
        <Tbody>
          {shootingDays.map((day) => (
            <Tr
              key={day.id}
              bg={selectedDayId === day.id ? 'gray.200' : 'transparent'}
              _hover={{
                bg: selectedDayId === day.id ? 'gray.300' : 'gray.100',
              }}
            >
              <Td>{day.shooting_day_number}</Td>
              <Td>{formatDateToDisplay(day.date)}</Td>
              <Td textAlign="center">
                <DailyReportStatusIcon hasDailyReport={!!day.dailyReport} />
              </Td>
              <Td textAlign="center">
                <IconButton
                  colorScheme="orange"
                  size="xs"
                  onClick={() => onPreview(day)}
                  aria-label="Preview shooting day"
                  icon={<Search2Icon />}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ShootingDaysTable;
