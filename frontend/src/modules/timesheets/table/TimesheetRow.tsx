import React from 'react';
import { DeleteIcon, WarningTwoIcon } from '@chakra-ui/icons';
import {
  Box,
  IconButton,
  Td,
  Tooltip,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';

import { currencyUtil } from '@shared/currencyUtil';
import { statementUtil } from '@shared/statementUtil';

import { Timesheet } from '../interfaces';
import {
  formatDateToDisplay,
  formatDateToDisplayOnMobile,
  formatTime,
} from '../utils/timeUtils';

interface TimesheetRowProps {
  ts: Timesheet;
  isDuplicate: boolean;
  hasCar: boolean;
  projectCurrency: string;
  onDeleteClick: (id: string) => void;
  handleRowClick: (timesheet: Timesheet) => void;
  hasDuplicates: boolean;
  shouldShowCarColumns: boolean;
}

const TimesheetRow = ({
  ts,
  isDuplicate,
  hasCar,
  projectCurrency,
  onDeleteClick,
  handleRowClick,
  hasDuplicates,
  shouldShowCarColumns,
}: TimesheetRowProps) => {
  const dateToDisplay = useBreakpointValue({
    base: formatDateToDisplayOnMobile,
    lg: formatDateToDisplay,
  });

  const displayDate = (date: Date | string): string => {
    return (dateToDisplay ?? formatDateToDisplay)(date);
  };

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
        textOverflow="ellipsis"
        overflow="hidden"
        maxW={{ base: '100px', md: '110px', lg: '150px' }}
        minW={{ base: '100px', md: '110px', lg: '150px' }}
        bg={{
          base: isDuplicate ? 'orange.100' : 'gray.50',
        }}
        zIndex={7}
      >
        {ts.projectUser?.name ?? 'Unknown'} {ts.projectUser?.surname ?? 'User'}
      </Td>
      <Td
        textAlign="center"
        position="sticky"
        left={{ base: '100px', md: '110px', lg: '150px' }}
        textOverflow="ellipsis"
        overflow="hidden"
        bg={isDuplicate ? 'orange.100' : 'gray.50'}
        zIndex={6}
      >
        {displayDate(ts.start_date)}
      </Td>
      <Td textAlign="center">
        {formatTime(ts.from)} - {formatTime(ts.to)}
      </Td>
      <Td textAlign="center">{ts.shift_lenght}</Td>
      <Td textAlign="center">{ts.calculated_overtime}</Td>
      <Td textAlign="center">{ts.claimed_overtime}</Td>
      <Td textAlign={shouldShowCarColumns ? 'right' : 'center'}>
        {currencyUtil.formatAmount(
          statementUtil.calculateOvertimeAmount(ts),
          projectCurrency,
        )}
      </Td>
      {shouldShowCarColumns && (
        <>
          <Td textAlign="center">{hasCar ? ts.car?.name : ''}</Td>
          <Td textAlign="center">{hasCar ? ts.kilometers : ''}</Td>
          <Td textAlign="center">{hasCar ? ts.car?.kilometer_allow : ''}</Td>
          <Td textAlign="center">
            {hasCar ? statementUtil.calculateKilometersOver(ts) : ''}
          </Td>
          <Td textAlign="right">
            {hasCar
              ? currencyUtil.formatAmountPerKM(
                  ts.car?.kilometer_rate,
                  projectCurrency,
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
      <Td textAlign="right">
        {currencyUtil.formatAmount(
          statementUtil.calculateTotalCost(ts),
          projectCurrency,
          2,
        )}
      </Td>
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
};

export default TimesheetRow;
