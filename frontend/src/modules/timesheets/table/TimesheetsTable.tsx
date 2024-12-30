import React from 'react';
import { Box, Table, TableContainer, Tbody, Thead, Tr } from '@chakra-ui/react';

import { Timesheet } from '../interfaces';

import TimesheetRow from './TimesheetRow';
import { TimesheetTableHeader } from './TimesheetsTableHeader';

interface TimesheetsTableProps {
  sortedTimesheets: Timesheet[];
  handleRowClick: (timesheet: Timesheet) => void;
  onDeleteClick: (id: string) => void;
  projectCurrency: string;
}

const tableHeaders = [
  'Shift type',
  'Time (from - to)',
  'Calc OT',
  'Claim OT',
  'OT Amount',
];

const carHeaders = [
  'Vehicle',
  'KM Total',
  'KM Allow',
  'KM Over',
  'KM per',
  'Mileage Tot',
];

const TimesheetTable = ({
  sortedTimesheets,
  handleRowClick,
  onDeleteClick,
  projectCurrency,
}: TimesheetsTableProps) => {
  const duplicateStatements = sortedTimesheets.reduce(
    (acc, ts) => {
      const date = ts.start_date.split('T')[0];
      const userId = ts.projectUser.id;
      const key = `${userId}-${date}`;
      acc[key] = acc[key] ? [...acc[key], ts] : [ts];
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
    <Box overflowX="auto">
      <TableContainer className="custom-scrollbar">
        <Box
          overflowX="auto"
          overflowY="auto"
          maxHeight={'65vh'}
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
              td: { padding: '2', paddingBlock: '2', fontSize: '0.8rem' },
              'tr:hover td': {
                backgroundColor: 'gray.200',
              },
            }}
          >
            <Thead position="sticky" top={0} zIndex="docked">
              <Tr>
                {hasDuplicates && (
                  <TimesheetTableHeader>Info</TimesheetTableHeader>
                )}
                <TimesheetTableHeader zIndex={10} left="0" position="sticky">
                  User
                </TimesheetTableHeader>
                <TimesheetTableHeader
                  zIndex={9}
                  position="sticky"
                  left={{ base: '100px', md: '110px', lg: '150px' }}
                >
                  Date
                </TimesheetTableHeader>
                {tableHeaders.map((header, index) => (
                  <TimesheetTableHeader key={index}>
                    {header}
                  </TimesheetTableHeader>
                ))}
                {shouldShowCarColumns &&
                  carHeaders.map((header, index) => (
                    <TimesheetTableHeader key={index}>
                      {header}
                    </TimesheetTableHeader>
                  ))}
                <TimesheetTableHeader>Total</TimesheetTableHeader>
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
                  <TimesheetRow
                    key={ts.id}
                    ts={ts}
                    isDuplicate={isDuplicate}
                    hasCar={hasCar}
                    projectCurrency={projectCurrency}
                    onDeleteClick={onDeleteClick}
                    handleRowClick={handleRowClick}
                    hasDuplicates={hasDuplicates}
                    shouldShowCarColumns={shouldShowCarColumns}
                  />
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
