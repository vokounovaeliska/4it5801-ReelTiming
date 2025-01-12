import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { CheckIcon, CloseIcon, EditIcon, Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';

import { GET_SHOOTING_DAYS_BY_PROJECT } from '@frontend/graphql/queries/GetShootingDaysByProject';
import { formatDateToDisplay } from '@frontend/modules/timesheets/utils/timeUtils';
import { Heading } from '@frontend/shared/design-system';

import DailyReportForm from '../forms/DailyReportForm';
import {
  DailyReport,
  Project,
  ShootingDayByProject,
  ShootingDaysByProject,
} from '../interfaces/interface';

import { AddDailyReportButton } from './AddDailyReportButton';
import DailyReportPreview from './DailyReportPreview';

type Props = {
  project: Project;
};

const ShootingDaysList = ({ project }: Props) => {
  const { data, loading, error, refetch } = useQuery<ShootingDaysByProject>(
    GET_SHOOTING_DAYS_BY_PROJECT,
    {
      variables: { projectId: project?.id },
      skip: !project?.id,
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    },
  );

  const [selectedDay, setSelectedDay] = useState<ShootingDayByProject | null>(
    null,
  );
  const [editMode, setEditMode] = useState<'add' | 'edit'>('add');
  const [selectedReport, setSelectedReport] = useState<DailyReport | null>(
    null,
  );
  const [shootingDay, setShootingDay] = useState<ShootingDayByProject | null>(
    null,
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEditClick = (day: ShootingDayByProject) => {
    setSelectedReport(day.dailyReport?.[0] || null);
    setShootingDay(day || null);
    setEditMode('edit');
    onOpen();
  };

  const handleAddClick = () => {
    setEditMode('add');
    setSelectedReport(null);
    onOpen();
    refetch();
  };

  if (loading)
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading shooting days...</Text>
      </Center>
    );

  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  const shootingDays = data?.shootingDaysByProject || [];

  const handlePreviewClick = (day: ShootingDayByProject) => {
    setSelectedDay(day);
  };

  const availableShootingDays = shootingDays.filter((day) => !day.dailyReport);

  return (
    <Box
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
      width={selectedDay ? '100%' : 'auto'}
    >
      <Box flex="1">
        <Heading as="h3" pb={4} pl={4}>
          Shooting Days
        </Heading>

        <AddDailyReportButton
          onClick={handleAddClick}
          ml={8}
          mb={4}
          isDisabled={availableShootingDays.length === 0 || !project?.is_active}
        />

        <DailyReportForm
          projectId={project?.id}
          shootingDays={shootingDays}
          refetchShootingDays={refetch}
          mode={editMode}
          dailyReport={selectedReport ?? undefined}
          onCloseEdit={() => {
            setEditMode('add');
            setSelectedReport(null);
          }}
          isOpen={isOpen}
          onClose={onClose}
          shootingDay={shootingDay}
        />

        <TableContainer overflowX="auto">
          <Table variant="simple" size="sm" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Day N.</Th>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th>Edit</Th>
                <Th>Preview</Th>
              </Tr>
            </Thead>
            <Tbody>
              {shootingDays.map((day) => (
                <Tr key={day.id}>
                  <Td>{day.shooting_day_number}</Td>
                  <Td>{formatDateToDisplay(day.date)}</Td>
                  <Td textAlign="center">
                    {day.dailyReport ? (
                      <IconButton
                        colorScheme="green"
                        size="xs"
                        icon={<CheckIcon />}
                        aria-label="Daily report created"
                      />
                    ) : (
                      <IconButton
                        size="xs"
                        aria-label="No daily report"
                        icon={<CloseIcon />}
                      />
                    )}
                  </Td>
                  <Td textAlign="center">
                    <IconButton
                      colorScheme="gray"
                      size="xs"
                      aria-label="Edit"
                      icon={<EditIcon />}
                      onClick={() => handleEditClick(day)}
                      isDisabled={!day.dailyReport}
                    />
                  </Td>
                  <Td textAlign="center">
                    <IconButton
                      colorScheme="orange"
                      size="xs"
                      onClick={() => handlePreviewClick(day)}
                      aria-label="Preview shooting day"
                      icon={<Search2Icon />}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Box flex="5" p={4} display={selectedDay ? 'block' : 'none'}>
        {selectedDay && (
          <DailyReportPreview
            shootingDay={selectedDay}
            projectId={project.id}
          />
        )}
      </Box>
    </Box>
  );
};

export default ShootingDaysList;

