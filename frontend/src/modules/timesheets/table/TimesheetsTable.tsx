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

import { currencyUtil } from '@shared/currencyUtil';
import { statementUtil } from '@shared/statementUtil';

import { Timesheet } from '../interfaces';
import { formatDateToDisplay, formatTime } from '../utils/timeUtils';

import { TimesheetTableHeader } from './TimesheetsTableHeader';

interface TimesheetsTableProps {
  sortedTimesheets: Timesheet[];
  handleRowClick: (timesheet: Timesheet) => void;
  onDeleteClick: (id: string) => void;
  projectCurrency: string;
}

const TimesheetTable: React.FC<TimesheetsTableProps> = ({
  sortedTimesheets,
  handleRowClick,
  onDeleteClick,
  projectCurrency,
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
    <Box overflowX="auto">
      <TableContainer className="custom-scrollbar">
        <Box
          overflowX="auto"
          overflowY="auto"
          maxHeight={'62vh'}
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
                <TimesheetTableHeader>Calc OT</TimesheetTableHeader>

                <TimesheetTableHeader>Claim OT</TimesheetTableHeader>
                <TimesheetTableHeader>OT Amount</TimesheetTableHeader>
                {shouldShowCarColumns && (
                  <>
                    <TimesheetTableHeader>Vehicle</TimesheetTableHeader>
                    <TimesheetTableHeader>KM Total</TimesheetTableHeader>
                    <TimesheetTableHeader>KM Allow</TimesheetTableHeader>
                    <TimesheetTableHeader>KM Over</TimesheetTableHeader>
                    <TimesheetTableHeader>KM per</TimesheetTableHeader>
                    <TimesheetTableHeader>Mileage Amount</TimesheetTableHeader>
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
                      }}
                      zIndex={7}
                    >
                      {ts.projectUser?.name ?? 'Unknown'}{' '}
                      {ts.projectUser?.surname ?? 'User'}
                    </Td>
                    <Td
                      position="sticky"
                      left="145px"
                      textAlign="center"
                      bg={{
                        base: isDuplicate ? 'orange.100' : 'gray.50',
                      }}
                      zIndex={6}
                    >
                      {formatDateToDisplay(ts.start_date)}
                    </Td>
                    <Td textAlign="center">{ts.shift_lenght}</Td>
                    <Td textAlign="center">
                      {formatTime(ts.from)} - {formatTime(ts.to)}
                    </Td>
                    <Td textAlign="center">{ts.calculated_overtime}</Td>
                    <Td textAlign="center">{ts.claimed_overtime}</Td>
                    <Td textAlign={shouldShowCarColumns ? 'right' : 'center'}>
                      {currencyUtil.formatAmount(
                        statementUtil.calculateOvertimeAmount(ts),
                        projectCurrency,
                        2,
                      )}
                    </Td>

                    {shouldShowCarColumns && (
                      <>
                        <Td textAlign="center">{hasCar ? ts.car?.name : ''}</Td>
                        <Td textAlign="center">
                          {hasCar ? ts.kilometers : ''}
                        </Td>
                        <Td textAlign="center">
                          {hasCar ? ts.car?.kilometer_allow : ''}
                        </Td>
                        <Td textAlign="center">
                          {hasCar
                            ? statementUtil.calculateKilometersOver(ts)
                            : ''}
                        </Td>
                        <Td textAlign="right">
                          {hasCar
                            ? currencyUtil.formatAmountPerKM(
                                ts.car?.kilometer_rate,
                                projectCurrency,
                                2,
                              )
                            : ''}
                        </Td>
                        <Td textAlign="right">
                          {hasCar
                            ? currencyUtil.formatAmount(
                                statementUtil.calculateKilometerSum(ts),
                                projectCurrency,
                                2,
                              )
                            : ''}
                        </Td>
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
