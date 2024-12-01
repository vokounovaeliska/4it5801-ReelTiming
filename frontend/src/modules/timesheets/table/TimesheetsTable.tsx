import React from 'react';
import { DeleteIcon, WarningTwoIcon } from '@chakra-ui/icons';
import {
  Box,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';

import { Timesheet } from '../interfaces';
import { formatDateToDisplay, formatTime } from '../utils/timeUtils';

import { TimesheetTableHeader } from './TimesheetsTableHeader';

interface TimesheetsTableProps {
  sortedTimesheets: Timesheet[];
  handleRowClick: (timesheet: Timesheet) => void;
  onDeleteClick: (id: string) => void;
}

const TimesheetTable: React.FC<TimesheetsTableProps> = ({
  sortedTimesheets,
  handleRowClick,
  onDeleteClick,
}) => {
  const duplicateStatements = sortedTimesheets.reduce(
    (acc, ts) => {
      const date = ts.start_date.split('T')[0];
      const userId = ts.projectUser.id;
      const key = `${userId}-${date}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(ts);
      return acc;
    },
    {} as Record<string, Timesheet[]>,
  );

  const duplicates = Object.keys(duplicateStatements).reduce(
    (acc, key) => {
      if (duplicateStatements[key].length > 1) {
        acc[key] = true;
      }
      return acc;
    },
    {} as Record<string, boolean>,
  );

  const hasDuplicates = Object.keys(duplicates).length > 0;

  const shouldShowCarColumns = sortedTimesheets.some(
    (ts) => ts.car_id !== null && ts.car !== null,
  );

  return (
    <Box overflowX="scroll">
      <TableContainer className="custom-scrollbar">
        <Box
          overflowX="auto"
          overflowY="auto"
          maxHeight={'70vh'}
          sx={{
            '::-webkit-scrollbar': {
              height: '12px',
            },
            '::-webkit-scrollbar-track': {
              background: '#2D3748',
            },
            '::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '6px',
            },
            '::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
            scrollbarWidth: 'thin',
            scrollbarColor: '#2D3748 white',
          }}
        >
          <Table
            variant="simple"
            size="sm"
            mb={2}
            pr={2}
            sx={{
              td: { fontSize: '0.8rem' },
              'tr:hover td': {
                backgroundColor: 'gray.200',
              },
            }}
          >
            <Thead>
              <Tr>
                {hasDuplicates && (
                  <TimesheetTableHeader>Info</TimesheetTableHeader>
                )}
                <TimesheetTableHeader zIndex={10} left="0">
                  User
                </TimesheetTableHeader>

                <TimesheetTableHeader zIndex={9} left="145px">
                  Date
                </TimesheetTableHeader>
                <TimesheetTableHeader>Shift type</TimesheetTableHeader>
                <TimesheetTableHeader>Time (from - to)</TimesheetTableHeader>
                <TimesheetTableHeader>Calculated OT</TimesheetTableHeader>

                <TimesheetTableHeader>Claimed OT</TimesheetTableHeader>
                {shouldShowCarColumns && (
                  <>
                    <TimesheetTableHeader>KM</TimesheetTableHeader>
                    <TimesheetTableHeader>Vehicle</TimesheetTableHeader>
                  </>
                )}
                <TimesheetTableHeader>Delete</TimesheetTableHeader>
              </Tr>
            </Thead>
            <Tbody>
              {sortedTimesheets.map((ts) => {
                const date = ts.start_date.split('T')[0];
                const userId = ts.projectUser.id;
                const key = `${userId}-${date}`;
                const isDuplicate = duplicates[key];
                const hasCar = ts.car_id !== null && ts.car !== null;
                return (
                  <Tr
                    key={ts.id}
                    onClick={() => handleRowClick(ts)}
                    _hover={{
                      cursor: 'pointer',
                      backgroundColor: isDuplicate ? 'orange.300' : 'gray.100',
                    }}
                    bg={isDuplicate ? 'orange.100' : 'transparent'}
                  >
                    {hasDuplicates && (
                      <Td
                        bg={{
                          base: isDuplicate ? 'orange.100' : 'gray.50',
                          lg: isDuplicate ? 'orange.100' : 'transparent',
                        }}
                      >
                        {isDuplicate && (
                          <Tooltip label="Duplicate date statement">
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              w="100%"
                            >
                              <WarningTwoIcon color="red.500" boxSize={4} />
                            </Box>
                          </Tooltip>
                        )}
                      </Td>
                    )}
                    <Td
                      position="sticky"
                      left="0"
                      minW="145px"
                      bg={{
                        base: isDuplicate ? 'orange.100' : 'gray.50',
                        lg: isDuplicate ? 'orange.100' : 'transparent',
                      }}
                      zIndex={7}
                    >
                      {ts.projectUser?.name ?? 'Unknown'}{' '}
                      {ts.projectUser?.surname ?? 'User'}
                    </Td>
                    <Td
                      position="sticky"
                      left="145px"
                      bg={{
                        base: isDuplicate ? 'orange.100' : 'gray.50',
                        lg: isDuplicate ? 'orange.100' : 'transparent',
                      }}
                      zIndex={6}
                    >
                      {formatDateToDisplay(ts.start_date)}
                    </Td>
                    <Td textAlign="center">{ts.shift_lenght}</Td>
                    <Td>
                      {formatTime(ts.from)} - {formatTime(ts.to)}
                    </Td>
                    <Td textAlign="center">{ts.calculated_overtime}</Td>
                    <Td textAlign="center">{ts.claimed_overtime}</Td>
                    {shouldShowCarColumns && (
                      <>
                        <Td textAlign="center">
                          {hasCar ? ts.kilometers : ''}
                        </Td>
                        <Td textAlign="center">{hasCar ? ts.car?.name : ''}</Td>
                      </>
                    )}
                    <Td textAlign="center">
                      <IconButton
                        aria-label="Delete timesheet"
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        size="xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteClick(ts.id);
                        }}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default TimesheetTable;
