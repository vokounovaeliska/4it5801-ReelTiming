import React from 'react';
import { Box } from '@chakra-ui/react';

import PdfReportGeneratorButton from '@frontend/modules/report/pdfReportGeneratorButton';
import { Heading } from '@frontend/shared/design-system';

import { AddShiftButton } from '../atoms/AddShiftButton';
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
  projectUserId,
  selectedUsers,
  project,
}) => {
  const isGeneratePdfDisabled =
    (!startDate || !endDate || selectedUsers.length !== 1) &&
    userRole === 'ADMIN';

  console.log('project', project);

  return (
    <Box flex="1" width="100%" p={1} alignSelf="center">
      <Box
        justifyItems={{ base: 'center', sm: 'flex-start' }}
        py={{ base: '4', sm: '0' }}
      >
        <Heading mb={4} textAlign="center">
          Timesheets for Project {project?.name}
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
        <AddShiftButton
          handleAddClick={handleAddClick}
          isShown={project?.is_active}
        />

        <PdfReportGeneratorButton
          projectUserId={
            selectedUsers.length === 1 ? selectedUsers[0]?.value : projectUserId
          }
          startDate={startDate}
          endDate={endDate}
          selectedUsers={selectedUsers}
          isDisabled={isGeneratePdfDisabled}
        />
      </Box>
      <TimesheetTable
        sortedTimesheets={sortedTimesheets}
        handleRowClick={handleRowClick}
        onDeleteClick={onDeleteClick}
        project={project}
      ></TimesheetTable>
    </Box>
  );
};

export default TimesheetsTemplate;
