import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DeleteIcon, EditIcon, Search2Icon } from '@chakra-ui/icons';
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
import { useNavigate, useParams } from 'react-router-dom';

import { DELETE_DAILY_REPORT } from '@frontend/graphql/mutations/DeleteDailyReport';
import { GET_LAST_DAILY_REPORT_BY_PROJECT } from '@frontend/graphql/queries/GetLastDailyReportByProjectId';
import { GET_SHOOTING_DAYS_BY_PROJECT } from '@frontend/graphql/queries/GetShootingDaysByProject';
import { formatDateToDisplay } from '@frontend/modules/timesheets/utils/timeUtils';
import { route } from '@frontend/route';
import { Heading } from '@frontend/shared/design-system';

import DailyReportForm from '../forms/DailyReportForm';
import {
  DailyReport,
  LastDailyReportByProjectIdQuery,
  ShootingDayByProject,
  ShootingDaysByProject,
} from '../interfaces/interface';

import { AddDailyReportButton } from './AddDailyReportButton';
import DailyReportDeleteAlertDialog from './DailyReportAlertDialog';
import DailyReportStatusIcon from './DailyReportStatusIcon';
import DailyReportTabs from './DailyReportTabs';

type Props = {
  projectId: string;
};

const ShootingDaysList = ({ projectId }: Props) => {
  const navigate = useNavigate();
  const { shootingDayId } = useParams<{ shootingDayId?: string }>();
  const { data, loading, error, refetch } = useQuery<ShootingDaysByProject>(
    GET_SHOOTING_DAYS_BY_PROJECT,
    {
      variables: { projectId },
      skip: !projectId,
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    },
  );

  const { data: lastDailyReportData, refetch: lastDailyReportRefetch } =
    useQuery<LastDailyReportByProjectIdQuery>(
      GET_LAST_DAILY_REPORT_BY_PROJECT,
      {
        variables: { projectId },
        skip: !projectId,
        fetchPolicy: 'no-cache',
      },
    );

  const [deleteDailyReport] = useMutation(DELETE_DAILY_REPORT);
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
  const isFormOpen = useDisclosure();
  const isDeleteAlertOpen = useDisclosure();
  const [dayToDelete, setDayToDelete] = useState<ShootingDayByProject | null>(
    null,
  );

  useEffect(() => {
    if (shootingDayId && data) {
      const foundDay = data.shootingDaysByProject.find(
        (day) => day.id === shootingDayId,
      );
      setSelectedDay(foundDay || null);
    }
  }, [shootingDayId, data]);

  const handlePreviewClick = (day: ShootingDayByProject) => {
    navigate(route.dailyReports(projectId, day.id));
    setSelectedDay(day);
  };

  const handleEditClick = (day: ShootingDayByProject) => {
    setSelectedReport(day.dailyReport?.[0] || null);
    setShootingDay(day || null);
    setEditMode('edit');
    isFormOpen.onOpen();
  };

  const handleAddClick = () => {
    setEditMode('add');
    setSelectedReport(null);
    isFormOpen.onOpen();
    refetch();
  };

  const handleDeleteClick = (day: ShootingDayByProject) => {
    setDayToDelete(day);
    isDeleteAlertOpen.onOpen();
  };

  const handleConfirmDelete = async () => {
    if (dayToDelete?.dailyReport?.[0]?.id) {
      await deleteDailyReport({
        variables: { dailyReportId: dayToDelete.dailyReport[0].id },
      });
      setDayToDelete(null);
      setSelectedDay(null);
      refetch();
      lastDailyReportRefetch();
      isDeleteAlertOpen.onClose();
    }
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
          isDisabled={availableShootingDays.length === 0}
        />

        <DailyReportForm
          projectId={projectId}
          shootingDays={shootingDays}
          refetchShootingDays={refetch}
          mode={editMode}
          dailyReport={selectedReport ?? undefined}
          onCloseEdit={() => {
            setEditMode('add');
            setSelectedReport(null);
          }}
          isOpen={isFormOpen.isOpen}
          onClose={isFormOpen.onClose}
          shootingDay={shootingDay}
          lastDailyReport={lastDailyReportData}
          lastDailyReportRefetch={lastDailyReportRefetch}
        />

        <TableContainer>
          <Table
            variant="simple"
            size="sm"
            colorScheme="gray"
            sx={{
              borderSpacing: 0,
              '& th, & td': {
                px: { base: 1, md: 2 },
              },
            }}
          >
            <Thead>
              <Tr>
                <Th>Day N.</Th>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
                <Th>Preview</Th>
              </Tr>
            </Thead>
            <Tbody>
              {shootingDays.map((day) => (
                <Tr
                  key={day.id}
                  bg={selectedDay?.id === day.id ? 'gray.200' : 'transparent'}
                  _hover={{
                    bg: selectedDay?.id === day.id ? 'gray.300' : 'gray.100',
                  }}
                >
                  <Td>{day.shooting_day_number}</Td>
                  <Td>{formatDateToDisplay(day.date)}</Td>
                  <Td textAlign="center">
                    <DailyReportStatusIcon hasDailyReport={!!day.dailyReport} />
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
                    <IconButton
                      ml={2}
                      colorScheme="red"
                      size="xs"
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      onClick={() => handleDeleteClick(day)}
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
          <DailyReportTabs shootingDay={selectedDay} projectId={projectId} />
        )}
      </Box>

      <DailyReportDeleteAlertDialog
        isOpen={isDeleteAlertOpen.isOpen}
        onClose={isDeleteAlertOpen.onClose}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default ShootingDaysList;
