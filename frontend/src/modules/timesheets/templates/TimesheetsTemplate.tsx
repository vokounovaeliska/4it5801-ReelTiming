import React from 'react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import Select from 'react-select';

import PdfReportGeneratorButton from '@frontend/modules/report/pdfReportGeneratorButton';

import { TimesheetsTemplateProps } from '../interfaces';
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
  authUser,
}) => {
  return (
    <Box flex="1" p={4} width="100%" maxWidth="1200px" mx="auto">
      <Heading mb={4} textAlign="center">
        Timesheets for Project {projectName}
      </Heading>
      <Box textAlign="center" mb={4}>
        <VStack spacing={3}>
          <IconButton
            aria-label="Add statement"
            colorScheme="orange"
            bgColor={'orange.500'}
            onClick={handleAddClick}
            size="lg"
            icon={<AddIcon />}
            borderRadius="full"
            boxShadow="md"
            _hover={{
              bg: 'orange.500',
              color: 'white',
              transform: 'scale(1.2)',
            }}
            transition="all 0.3s ease"
          />
          <Box fontSize="sm">Add Statement</Box>
          <PdfReportGeneratorButton
            projectUserId={projectUserId}
            startDate={startDate}
            endDate={endDate}
            authUser={authUser}
          />
        </VStack>
      </Box>
      <Flex justify="start" mb={4}>
        <VStack spacing={3} align="flex-start" width="100%">
          <Input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => handleDateChange(e, 'start')}
            width={{ base: '100%', sm: '250px', md: '300px' }}
          />
          <Input
            borderWidth={2}
            borderColor={'gray.200'}
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => handleDateChange(e, 'end')}
            width={{ base: '100%', sm: '250px', md: '300px' }}
          />
          {userRole === 'ADMIN' && (
            <Select
              isMulti
              options={userOptions}
              placeholder="Select Users"
              onChange={handleUserChange}
              styles={{
                container: (provided) => ({
                  ...provided,
                  width: '100%',
                  maxWidth: '300px',
                }),
              }}
            />
          )}
        </VStack>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Date</Th>
            <Th textAlign="center">Shift type</Th>
            <Th>Time (from - to)</Th>
            <Th textAlign="center">Calculated OT</Th>
            <Th textAlign="center">Claimed OT</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedTimesheets.map((ts) => (
            <Tr
              key={ts.id}
              onClick={() => handleRowClick(ts)}
              _hover={{
                cursor: 'pointer',
                backgroundColor: 'gray.100',
              }}
            >
              <Td>
                {ts.projectUser?.user?.name ?? 'Unknown'}{' '}
                {ts.projectUser?.user?.surname ?? 'User'}
              </Td>
              <Td>{formatDate(ts.start_date)}</Td>
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
                  size="md"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteClick(ts.id);
                  }}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TimesheetsTemplate;
