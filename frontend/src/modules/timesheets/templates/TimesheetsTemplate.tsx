import React from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { MdAddChart } from 'react-icons/md';

import PdfReportGeneratorButton from '@frontend/modules/report/pdfReportGeneratorButton';

import { TimesheetsTemplateProps } from '../interfaces';
import TimesheetTable from '../table/TimesheetsTable';
import { TimesheetFilter } from '../timesheetFilter';

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
  projectCurrency,
  projectUserId,
  selectedUsers,
}) => {
  const isGeneratePdfDisabled =
    (!startDate || !endDate || selectedUsers.length !== 1) &&
    userRole === 'ADMIN';

  return (
    <Box flex="1" p={4} width="98%" alignSelf="center">
      <Box
        justifyItems={{ base: 'center', sm: 'flex-start' }}
        py={{ base: '4', sm: '0' }}
      >
        <Heading mb={4} textAlign="center">
          Timesheets for Project {projectName}
        </Heading>
      </Box>
      <TimesheetFilter
        startDate={startDate}
        endDate={endDate}
        userRole={userRole}
        handleDateChange={handleDateChange}
        userOptions={userOptions}
        handleUserChange={handleUserChange}
      />
      <Box
        display={{ base: 'grid', sm: 'flex' }}
        justifyContent={{ base: 'center', sm: 'space-between' }}
        textAlign="center"
        alignItems="flex-end"
        mb={4}
        px={3}
      >
        <Box
          display={{ base: 'grid', sm: 'flex' }}
          fontSize="sm"
          gap="4"
          mt={{ base: 2, md: 3 }}
        >
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
            Add Shift
          </Button>
          <PdfReportGeneratorButton
            projectUserId={
              selectedUsers.length === 1
                ? selectedUsers[0]?.value
                : projectUserId
            }
            startDate={startDate}
            endDate={endDate}
            label={
              selectedUsers.length === 1
                ? `Generate PDF for ${selectedUsers[0]?.label}`
                : `Generate shifts report (for ${new Date(startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric' }).replace(/\//g, '.')} - ${new Date(endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric' }).replace(/\//g, '.')})`
            }
            isDisabled={isGeneratePdfDisabled}
          />
        </Box>
      </Box>
      <TimesheetTable
        sortedTimesheets={sortedTimesheets}
        handleRowClick={handleRowClick}
        onDeleteClick={onDeleteClick}
        projectCurrency={projectCurrency}
      ></TimesheetTable>
    </Box>
  );
};

export default TimesheetsTemplate;
