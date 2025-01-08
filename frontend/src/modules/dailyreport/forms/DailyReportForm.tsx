import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { ADD_DAILY_REPORT } from '@frontend/graphql/mutations/AddDailyReport';
import { GET_LAST_DAILY_REPORT_BY_PROJECT } from '@frontend/graphql/queries/GetLastDailyReportByProjectId';
import { formatDateToDisplay } from '@frontend/modules/timesheets/utils/timeUtils';
import {
  showErrorToast,
  showSuccessToast,
} from '@frontend/shared/design-system/molecules/toastUtils';

import { AddDailyReportButton } from '../atoms/AddDailyReportButton';
import { ShootingDayByProject } from '../interfaces/interface';

interface ReportItem {
  title: string;
  value: string;
}

interface DailyReportFormProps {
  projectId: string;
  shootingDays: ShootingDayByProject[];
}

function DailyReportForm({ projectId, shootingDays }: DailyReportFormProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading } = useQuery(GET_LAST_DAILY_REPORT_BY_PROJECT, {
    variables: { projectId },
  });
  const [addDailyReport] = useMutation(ADD_DAILY_REPORT);

  const [intro, setIntro] = useState<ReportItem[]>([]);
  const [shootingProgress, setShootingProgress] = useState<ReportItem[]>([]);
  const [footer, setFooter] = useState<ReportItem[]>([]);
  const [newItem, setNewItem] = useState<ReportItem>({ title: '', value: '' });
  const [section, setSection] = useState<
    'intro' | 'shootingProgress' | 'footer'
  >('intro');
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

  const handleAddItem = () => {
    if (!newItem.title || !newItem.value) return;

    switch (section) {
      case 'intro':
        setIntro([...intro, newItem]);
        break;
      case 'shootingProgress':
        setShootingProgress([...shootingProgress, newItem]);
        break;
      case 'footer':
        setFooter([...footer, newItem]);
        break;
    }
    setNewItem({ title: '', value: '' });
  };

  const handleSubmit = async () => {
    if (!selectedShootingDay) {
      showErrorToast('Please select a shooting day!'); //TODO zod validations
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
    } catch (error) {
      showErrorToast('Failed to add daily report. Please try again.');
    }
  };

  const availableShootingDays = shootingDays.filter((day) => !day.dailyReport);

  if (loading) return <p>Loading...</p>;

  return (
    <Box>
      <AddDailyReportButton onClick={onOpen} ml={8} mb={4} />

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Daily Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Select
                placeholder="Select a Shooting Day"
                value={selectedShootingDay || ''}
                onChange={(e) => setSelectedShootingDay(e.target.value)}
              >
                {availableShootingDays.map((day) => (
                  <option key={day.id} value={day.id}>
                    {`Day ${day.shooting_day_number} - ${formatDateToDisplay(
                      day.date,
                    )}`}
                  </option>
                ))}
              </Select>

              <HStack>
                <Input
                  placeholder="Title"
                  value={newItem.title}
                  onChange={(e) =>
                    setNewItem({ ...newItem, title: e.target.value })
                  }
                />
                <Input
                  placeholder="Value"
                  value={newItem.value}
                  onChange={(e) =>
                    setNewItem({ ...newItem, value: e.target.value })
                  }
                />
                <Button onClick={handleAddItem} colorScheme="orange">
                  Add
                </Button>
              </HStack>

              <HStack>
                <Button
                  onClick={() => setSection('intro')}
                  colorScheme={section === 'intro' ? 'orange' : 'gray'}
                >
                  Intro
                </Button>
                <Button
                  onClick={() => setSection('shootingProgress')}
                  colorScheme={
                    section === 'shootingProgress' ? 'orange' : 'gray'
                  }
                >
                  Shooting Progress
                </Button>
                <Button
                  onClick={() => setSection('footer')}
                  colorScheme={section === 'footer' ? 'orange' : 'gray'}
                >
                  Footer
                </Button>
              </HStack>

              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Value</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {section === 'intro' &&
                    intro.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.title}</Td>
                        <Td>{item.value}</Td>
                      </Tr>
                    ))}
                  {section === 'shootingProgress' &&
                    shootingProgress.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.title}</Td>
                        <Td>{item.value}</Td>
                      </Tr>
                    ))}
                  {section === 'footer' &&
                    footer.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.title}</Td>
                        <Td>{item.value}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </VStack>
          </ModalBody>

          <ModalFooter
            mt={8}
            display="flex"
            justifyContent="space-between"
            width="100%"
          >
            <Button colorScheme="gray" onClick={onClose}>
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
}

export default DailyReportForm;
