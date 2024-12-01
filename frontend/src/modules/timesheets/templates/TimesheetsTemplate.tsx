import React, { useState } from 'react';
import { DeleteIcon, WarningTwoIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import { MdAddChart, MdFilterAlt } from 'react-icons/md';

import PdfReportGeneratorButton from '@frontend/modules/report/pdfReportGeneratorButton';

import { Timesheet, TimesheetsTemplateProps } from '../interfaces';
import { TimesheetFilter } from '../timesheetFilter';
import { formatDate, formatTime } from '../utils/timeUtils';

const TimesheetsTemplate: React.FC<TimesheetsTemplateProps> = ({
  startDate,
  endDate,
  handleDateChange,
  userOptions,
  handleUserChange,
  handleAddClick,
  sortedTimesheets,
  handleRowClick,
  onDeleteClick,
  userRole,
  projectName,
  projectUserId,
  selectedUsers,
}) => {
  const [showFilters, setShowFilters] = useState(true);

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

  const isGeneratePdfDisabled =
    (!startDate || !endDate || selectedUsers.length !== 1) &&
    userRole === 'ADMIN';

  return (
    <Box flex="1" p={4} width="100%" maxWidth="1200px" mx="auto">
      <Box
        justifyItems={{ base: 'center', sm: 'flex-start' }}
        py={{ base: '4', sm: '0' }}
      >
        <Heading mb={4} textAlign="center">
          Timesheets for Project {projectName}
        </Heading>
        <Button
          variant="ghost"
          colorScheme="orange"
          leftIcon={<MdFilterAlt />}
          onClick={() => setShowFilters((prev) => !prev)}
        >
          {showFilters ? 'Hide filters' : 'Show filters'}
        </Button>
      </Box>
      {showFilters && (
        <TimesheetFilter
          startDate={startDate}
          endDate={endDate}
          userRole={userRole}
          handleDateChange={handleDateChange}
          userOptions={userOptions}
          handleUserChange={handleUserChange}
        />
      )}
      <Box
        display={{ base: 'grid', sm: 'flex' }}
        justifyContent={{ base: 'center', sm: 'space-between' }}
        textAlign="center"
        alignItems="flex-end"
        mb={4}
        px={3}
      >
        <Box display="grid" fontSize="sm">
          <Button
            aria-label="Add statement"
            colorScheme="orange"
            bgColor="orange.500"
            onClick={handleAddClick}
            size="md"
            leftIcon={<MdAddChart />}
            borderRadius="full"
            boxShadow="md"
            _hover={{
              bg: 'orange.500',
              color: 'white',
              transform: 'scale(1.2)',
            }}
            transition="all 0.3s ease"
          >
            Add Statement
          </Button>
        </Box>
        <PdfReportGeneratorButton
          projectUserId={
            selectedUsers.length === 1 ? selectedUsers[0]?.value : projectUserId
          }
          startDate={startDate}
          endDate={endDate}
          label={
            selectedUsers.length === 1
              ? `Generate PDF for ` + selectedUsers[0]?.label
              : 'Generate PDF'
          }
          isDisabled={isGeneratePdfDisabled}
        />
      </Box>
      <Box overflow="scroll">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              {hasDuplicates && <Th>Info</Th>}
              <Th position="sticky" left="0" bg="white">
                User
              </Th>
              <Th position="sticky" left="104" bg="white">
                Date
              </Th>
              <Th textAlign="center">Shift type</Th>
              <Th>Time (from - to)</Th>
              <Th textAlign="center">Calculated OT</Th>
              <Th textAlign="center">Claimed OT</Th>
              <Th textAlign="center">Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedTimesheets.map((ts) => {
              const date = ts.start_date.split('T')[0];
              const userId = ts.projectUser.id;
              const key = `${userId}-${date}`;
              const isDuplicate = duplicates[key];
              return (
                <Tr
                  key={ts.id}
                  onClick={() => handleRowClick(ts)}
                  _hover={{
                    cursor: 'pointer',
                    backgroundColor: isDuplicate ? 'yellow.100' : 'gray.100',
                  }}
                  bg={isDuplicate ? 'yellow.200' : 'transparent'}
                >
                  {hasDuplicates && (
                    <Td>
                      {isDuplicate && (
                        <Tooltip label="Duplicate date statement">
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            w="100%"
                          >
                            <WarningTwoIcon color="red.500" boxSize={5} />
                          </Box>
                        </Tooltip>
                      )}
                    </Td>
                  )}
                  <Td
                    position="sticky"
                    left="0"
                    bg={isDuplicate ? 'yellow.200' : 'white'}
                  >
                    {ts.projectUser?.name ?? 'Unknown'}{' '}
                    {ts.projectUser?.surname ?? 'User'}
                  </Td>
                  <Td
                    position="sticky"
                    left="104"
                    bg={isDuplicate ? 'yellow.200' : 'white'}
                  >
                    {formatDate(ts.start_date)}
                  </Td>
                  <Td textAlign="center">{ts.shift_lenght}</Td>
                  <Td>
                    {formatTime(ts.from)} - {formatTime(ts.to)}
                  </Td>
                  <Td textAlign="center">{ts.calculated_overtime}</Td>
                  <Td textAlign="center">{ts.claimed_overtime}</Td>
                  <Td>
                    <IconButton
                      aria-label="Delete timesheet"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      size="sm"
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
    </Box>
  );
};

export default TimesheetsTemplate;
