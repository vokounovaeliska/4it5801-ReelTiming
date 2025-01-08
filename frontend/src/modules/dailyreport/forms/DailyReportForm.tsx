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
import {
  LastDailyReportByProjectIdQuery,
  ReportItem,
  ShootingDayByProject,
} from '../interfaces/interface';

interface DailyReportFormProps {
  projectId: string;
  shootingDays: ShootingDayByProject[];
  refetchShootingDays: () => void;
}

const DailyReportForm = ({
  projectId,
  shootingDays,
  refetchShootingDays,
}: DailyReportFormProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useQuery<LastDailyReportByProjectIdQuery>(
    GET_LAST_DAILY_REPORT_BY_PROJECT,
    {
      variables: { projectId },
      skip: !projectId,
      fetchPolicy: 'cache-and-network',
    },
  );
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

  const cleanReportItems = (items: ReportItem[]) => {
    return items.map((item) => {
      if ('__typename' in item) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { __typename, ...rest } = item;
        return rest;
      }
      return item;
    });
  };
  useEffect(() => {
    if (
      data?.lastDailyReportByProjectId &&
      data.lastDailyReportByProjectId.length > 0
    ) {
      const lastReport = data.lastDailyReportByProjectId[0];
      setIntro(cleanReportItems(lastReport.intro) || []);
      setShootingProgress(cleanReportItems(lastReport.shooting_progress) || []);
      setFooter(cleanReportItems(lastReport.footer) || []);
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
      refetchShootingDays();
    } catch (error) {
      console.log(error);
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

  const availableShootingDays = shootingDays.filter((day) => !day.dailyReport);

  return (
    <Box p={2}>
      <AddDailyReportButton
        onClick={onOpen}
        ml={8}
        mb={4}
        isDisabled={availableShootingDays.length === 0}
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
              <SectionTable
                title="Intro"
                data={intro}
                newItem={introNewItem}
                setNewItem={setIntroNewItem}
                handleAddItem={() => handleAddItem('intro')}
              />
              <SectionTable
                title="Shooting Progress"
                data={shootingProgress}
                newItem={shootingProgressNewItem}
                setNewItem={setShootingProgressNewItem}
                handleAddItem={() => handleAddItem('shootingProgress')}
              />
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
