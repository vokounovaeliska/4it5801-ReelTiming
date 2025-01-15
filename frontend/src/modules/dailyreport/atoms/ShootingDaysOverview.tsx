import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Text, useDisclosure } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { DELETE_DAILY_REPORT } from '@frontend/graphql/mutations/DeleteDailyReport';
import { GET_LAST_DAILY_REPORT_BY_PROJECT } from '@frontend/graphql/queries/GetLastDailyReportByProjectId';
import { GET_SHOOTING_DAYS_BY_PROJECT } from '@frontend/graphql/queries/GetShootingDaysByProject';
import { route } from '@frontend/route';
import { Heading } from '@frontend/shared/design-system';
import { LoadingSpinner } from '@frontend/shared/design-system/atoms/LoadingSpinner';

import DailyReportForm from '../forms/DailyReportForm';
import {
  DailyReport,
  LastDailyReportByProjectIdQuery,
  Project,
  ShootingDayByProject,
  ShootingDaysByProject,
} from '../interfaces/interface';

import { AddDailyReportButton } from './AddDailyReportButton';
import DailyReportDeleteAlertDialog from './DailyReportAlertDialog';
import DailyReportTabs from './DailyReportTabs';
import ShootingDaysTable from './ShootingDaysTable';

type ShootingDaysOverviewProps = {
  project: Project;
};

const ShootingDaysOverview = ({ project }: ShootingDaysOverviewProps) => {
  const navigate = useNavigate();
  const { shootingDayId } = useParams<{ shootingDayId?: string }>();
  const { data, loading, error, refetch } = useQuery<ShootingDaysByProject>(
    GET_SHOOTING_DAYS_BY_PROJECT,
    {
      variables: { projectId: project.id },
      skip: !project.id,
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    },
  );

  const { data: lastDailyReportData, refetch: lastDailyReportRefetch } =
    useQuery<LastDailyReportByProjectIdQuery>(
      GET_LAST_DAILY_REPORT_BY_PROJECT,
      {
        variables: { projectId: project.id },
        skip: !project.id,
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
    navigate(route.dailyReports(project.id, day.id));
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

  if (loading) return <LoadingSpinner title="shooting days" />;

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
          isDisabled={availableShootingDays.length === 0 || !project?.is_active}
        />

        <DailyReportForm
          projectId={project.id}
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

        <ShootingDaysTable
          shootingDays={shootingDays}
          selectedDayId={selectedDay?.id || null}
          onPreview={handlePreviewClick}
        />
      </Box>

      <Box flex="5" p={4} display={selectedDay ? 'block' : 'none'}>
        {selectedDay && (
          <DailyReportTabs
            shootingDay={selectedDay}
            project={project}
            onEdit={() => handleEditClick(selectedDay)}
            onDelete={() => handleDeleteClick(selectedDay)}
          />
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

export default ShootingDaysOverview;
