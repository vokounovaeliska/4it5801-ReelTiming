import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';

import { ADD_DAILY_REPORT } from '@frontend/graphql/mutations/AddDailyReport';
import { EDIT_DAILY_REPORT } from '@frontend/graphql/mutations/EditDailyReport';
import { GET_LAST_DAILY_REPORT_BY_PROJECT } from '@frontend/graphql/queries/GetLastDailyReportByProjectId';
import { formatDateToDisplay } from '@frontend/modules/timesheets/utils/timeUtils';
import {
  showErrorToast,
  showSuccessToast,
} from '@frontend/shared/design-system/molecules/toastUtils';

import SectionTable from '../atoms/form/SectionTable';
import ShootingDaySelector from '../atoms/form/ShootingDaySelector';
import {
  DailyReportFormProps,
  LastDailyReportByProjectIdQuery,
  ReportItem,
} from '../interfaces/interface';
import { cleanReportItems } from '../utils/dailyReportUtils';

import {
  initFooterData,
  initIntroData,
  initShootingProgressData,
} from './initDailyReportData';

const DailyReportForm = ({
  projectId,
  shootingDays,
  refetchShootingDays,
  mode,
  dailyReport,
  onCloseEdit,
  isOpen,
  onClose,
  shootingDay,
}: DailyReportFormProps) => {
  const { data, refetch } = useQuery<LastDailyReportByProjectIdQuery>(
    GET_LAST_DAILY_REPORT_BY_PROJECT,
    {
      variables: { projectId },
      skip: !projectId,
      fetchPolicy: 'cache-and-network',
    },
  );
  const [addDailyReport] = useMutation(ADD_DAILY_REPORT);
  const [editDailyReport] = useMutation(EDIT_DAILY_REPORT);
  const [intro, setIntro] = useState<ReportItem[]>([]);
  const [shootingProgress, setShootingProgress] = useState<ReportItem[]>([]);
  const [footer, setFooter] = useState<ReportItem[]>([]);
  const [selectedShootingDay, setSelectedShootingDay] = useState<string | null>(
    null,
  );
  const [introNewItem, setIntroNewItem] = useState<ReportItem>({
    title: '',
    value: '',
  });
  const [shootingProgressNewItem, setShootingProgressNewItem] =
    useState<ReportItem>({ title: '', value: '' });
  const [footerNewItem, setFooterNewItem] = useState<ReportItem>({
    title: '',
    value: '',
  });

  useEffect(() => {
    if (mode === 'add') {
      const lastReport = data?.lastDailyReportByProjectId[0];
      setIntro(
        cleanReportItems(lastReport?.intro)?.length > 0
          ? cleanReportItems(lastReport?.intro)
          : initIntroData,
      );
      setShootingProgress(
        cleanReportItems(lastReport?.shooting_progress)?.length > 0
          ? cleanReportItems(lastReport?.shooting_progress)
          : initShootingProgressData,
      );
      setFooter(
        cleanReportItems(lastReport?.footer)?.length > 0
          ? cleanReportItems(lastReport?.footer)
          : initFooterData,
      );
    }
  }, [data, mode]);

  useEffect(() => {
    if (mode === 'edit' && dailyReport) {
      setIntro(cleanReportItems(dailyReport.intro));
      setShootingProgress(cleanReportItems(dailyReport.shooting_progress));
      setFooter(cleanReportItems(dailyReport.footer));
      setSelectedShootingDay(dailyReport.shootingDay?.id || null);
    }
  }, [mode, dailyReport]);

  const handleAddItem = (section: 'intro' | 'shootingProgress' | 'footer') => {
    let newItem: ReportItem;
    switch (section) {
      case 'intro':
        newItem = introNewItem;
        setIntro([...intro, newItem]);
        setIntroNewItem({ title: '', value: '' });
        break;
      case 'shootingProgress':
        newItem = shootingProgressNewItem;
        setShootingProgress([...shootingProgress, newItem]);
        setShootingProgressNewItem({ title: '', value: '' });
        break;
      case 'footer':
        newItem = footerNewItem;
        setFooter([...footer, newItem]);
        setFooterNewItem({ title: '', value: '' });
        break;
    }
  };

  const handleSubmit = async () => {
    if (!intro || !shootingProgress || !footer) {
      showErrorToast('All fields are required!');
      return;
    }

    try {
      if (mode === 'add') {
        if (!selectedShootingDay) {
          showErrorToast('Please select a shooting day!');
          return;
        }
        await addDailyReport({
          variables: {
            projectId,
            intro,
            shootingProgress,
            footer,
            shootingDayId: selectedShootingDay,
          },
        });
        showSuccessToast('Daily report added successfully.');
      } else if (
        mode === 'edit' &&
        dailyReport?.id &&
        projectId &&
        shootingDay?.id
      ) {
        await editDailyReport({
          variables: {
            dailyReportId: dailyReport.id,
            data: {
              intro: intro,
              shooting_progress: shootingProgress,
              footer: footer,
              project_id: projectId,
              shooting_day_id: shootingDay.id,
            },
          },
        });
        showSuccessToast('Daily report updated successfully.');
      }
      onClose();
      onCloseEdit();
      refetchShootingDays();
    } catch (error) {
      console.error(error);
      showErrorToast(
        `Failed to ${mode === 'add' ? 'add' : 'update'} daily report.`,
      );
    }
  };

  const handleModalClose = () => {
    if (
      mode === 'add' &&
      data?.lastDailyReportByProjectId &&
      data.lastDailyReportByProjectId.length > 0
    ) {
      const lastReport = data.lastDailyReportByProjectId[0];
      setIntro(cleanReportItems(lastReport.intro) || []);
      setShootingProgress(cleanReportItems(lastReport.shooting_progress) || []);
      setFooter(cleanReportItems(lastReport.footer) || []);
    } else if (mode === 'edit') {
      onCloseEdit();
    }
    refetch();

    onClose();
  };

  const availableShootingDays = shootingDays.filter((day) => !day.dailyReport);

  return (
    <Box p={2} overflowX="auto">
      <Modal isOpen={isOpen} onClose={handleModalClose} size="7xl">
        <ModalOverlay />
        <ModalContent m={8}>
          <ModalHeader>
            {mode === 'add'
              ? 'Create Daily Report'
              : 'Edit Daily Report for: ' +
                formatDateToDisplay(shootingDay?.date ?? '') +
                ' (Shooting day n. ' +
                shootingDay?.shooting_day_number +
                ' )'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              {mode === 'add' && (
                <ShootingDaySelector
                  selectedShootingDay={selectedShootingDay}
                  setSelectedShootingDay={setSelectedShootingDay}
                  shootingDays={availableShootingDays}
                />
              )}

              <SimpleGrid columns={{ base: 1, xl: 3 }} spacing={6}>
                <SectionTable
                  title="Intro"
                  data={intro}
                  setData={setIntro}
                  newItem={introNewItem}
                  setNewItem={setIntroNewItem}
                  handleAddItem={() => handleAddItem('intro')}
                />
                <SectionTable
                  title="Shooting Progress"
                  data={shootingProgress}
                  setData={setShootingProgress}
                  newItem={shootingProgressNewItem}
                  setNewItem={setShootingProgressNewItem}
                  handleAddItem={() => handleAddItem('shootingProgress')}
                />
                <SectionTable
                  title="Footer"
                  data={footer}
                  setData={setFooter}
                  newItem={footerNewItem}
                  setNewItem={setFooterNewItem}
                  handleAddItem={() => handleAddItem('footer')}
                />
              </SimpleGrid>
            </VStack>
          </ModalBody>

          <ModalFooter
            display="flex"
            justifyContent="space-between"
            width="100%"
          >
            <Button colorScheme="gray" onClick={handleModalClose}>
              Close
            </Button>
            <Button colorScheme="orange" onClick={handleSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DailyReportForm;
