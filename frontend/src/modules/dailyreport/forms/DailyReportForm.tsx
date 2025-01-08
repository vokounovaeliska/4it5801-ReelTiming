import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { ADD_DAILY_REPORT } from '@frontend/graphql/mutations/AddDailyReport';
import { GET_LAST_DAILY_REPORT_BY_PROJECT } from '@frontend/graphql/queries/GetLastDailyReportByProjectId';
import {
  showErrorToast,
  showSuccessToast,
} from '@frontend/shared/design-system/molecules/toastUtils';
import CustomModal from '@frontend/shared/forms/molecules/CustomModal';

import { AddDailyReportButton } from '../atoms/AddDailyReportButton';
import ShootingDaySelector from '../atoms/form/ShootingDaySelector';
import SectionTable from '../atoms/preview/SectionTable';
import { ReportItem, ShootingDayByProject } from '../interfaces/interface';

interface DailyReportFormProps {
  projectId: string;
  shootingDays: ShootingDayByProject[];
  refetchShootingDays: () => void; // Added refetch function as a prop
}

const DailyReportForm = ({
  projectId,
  shootingDays,
  refetchShootingDays,
}: DailyReportFormProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading } = useQuery(GET_LAST_DAILY_REPORT_BY_PROJECT, {
    variables: { projectId },
    skip: !projectId,
    fetchPolicy: 'cache-and-network',
  });
  const [addDailyReport] = useMutation(ADD_DAILY_REPORT);

  const [intro, setIntro] = useState<ReportItem[]>([]);
  const [shootingProgress, setShootingProgress] = useState<ReportItem[]>([]);
  const [footer, setFooter] = useState<ReportItem[]>([]);

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

  const [selectedShootingDay, setSelectedShootingDay] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (data?.lastDailyReportByProjectId) {
      setIntro(data.lastDailyReportByProjectId[0].intro || []);
      setShootingProgress(
        data.lastDailyReportByProjectId[0].shooting_progress || [],
      );
      setFooter(data.lastDailyReportByProjectId[0].footer || []);
    }
  }, [data]);

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
    if (!selectedShootingDay) {
      showErrorToast('Please select a shooting day!');
      return;
    }

    try {
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
      onClose();
      refetchShootingDays(); // Trigger refetch after mutation
    } catch (error) {
      showErrorToast('Failed to add daily report. Please try again.');
    }
  };

  const handleModalClose = () => {
    setIntro([]);
    setShootingProgress([]);
    setFooter([]);
    setIntroNewItem({ title: '', value: '' });
    setShootingProgressNewItem({ title: '', value: '' });
    setFooterNewItem({ title: '', value: '' });
    setSelectedShootingDay(null);
    onClose();
  };

  if (loading) return <p>Loading...</p>;

  const availableShootingDays = shootingDays.filter((day) => !day.dailyReport);

  return (
    <Box p={2}>
      <AddDailyReportButton
        onClick={onOpen}
        ml={8}
        mb={4}
        display={availableShootingDays.length ? 'block' : 'none'}
      />

      <CustomModal
        isOpen={isOpen}
        onClose={handleModalClose}
        title="Add daily report"
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Daily Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <ShootingDaySelector
                selectedShootingDay={selectedShootingDay}
                setSelectedShootingDay={setSelectedShootingDay}
                shootingDays={availableShootingDays}
              />

              {/* Intro Section Table */}
              <SectionTable
                title="Intro"
                data={intro}
                newItem={introNewItem}
                setNewItem={setIntroNewItem}
                handleAddItem={() => handleAddItem('intro')}
              />

              {/* Shooting Progress Section Table */}
              <SectionTable
                title="Shooting Progress"
                data={shootingProgress}
                newItem={shootingProgressNewItem}
                setNewItem={setShootingProgressNewItem}
                handleAddItem={() => handleAddItem('shootingProgress')}
              />

              {/* Footer Section Table */}
              <SectionTable
                title="Footer"
                data={footer}
                newItem={footerNewItem}
                setNewItem={setFooterNewItem}
                handleAddItem={() => handleAddItem('footer')}
              />
            </VStack>
          </ModalBody>

          <ModalFooter
            mt={8}
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
      </CustomModal>
    </Box>
  );
};

export default DailyReportForm;
