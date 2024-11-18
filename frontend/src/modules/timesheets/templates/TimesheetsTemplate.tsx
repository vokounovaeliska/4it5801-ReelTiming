import React, { useState } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { MdAddChart, MdFilterAlt } from 'react-icons/md';
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
  const [showFilters, setShowFilters] = useState(true);

  return (
    <Box flex="1" p={4} width="100%" maxWidth="1200px" mx="auto">
      <Box justifyItems={{ base: 'center', sm: 'flex-start' }}>
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
        <Box
          display={{ base: 'grid', sm: 'flex' }}
          justifyItems={{ base: 'center', sm: 'flex-start' }}
          gap="4"
          p="4"
        >
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
        </Box>
      )}
      <Box
        display={{ base: 'grid', sm: 'flex' }}
        justifyContent={{ base: 'center', sm: 'space-between' }}
        textAlign="center"
        alignItems="flex-end"
        mb={4}
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
          projectUserId={projectUserId}
          startDate={startDate}
          endDate={endDate}
          authUserId={authUser.id}
        />
      </Box>
      <Table variant="simple" size="sm">
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
