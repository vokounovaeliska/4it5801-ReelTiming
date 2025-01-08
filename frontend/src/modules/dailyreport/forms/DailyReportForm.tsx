import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
import {
  showErrorToast,
  showSuccessToast,
} from '@frontend/shared/design-system/molecules/toastUtils';
import CustomModal from '@frontend/shared/forms/molecules/CustomModal';

import { AddDailyReportButton } from '../atoms/AddDailyReportButton';
import ShootingDaySelector from '../atoms/ShootingDaySelector';
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
    } catch (error) {
      showErrorToast('Failed to add daily report. Please try again.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Box>
      <AddDailyReportButton onClick={onOpen} ml={8} mb={4} />

      <CustomModal isOpen={isOpen} onClose={onClose} title="Add daily report">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Daily Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <ShootingDaySelector
                selectedShootingDay={selectedShootingDay}
                setSelectedShootingDay={setSelectedShootingDay}
                shootingDays={shootingDays}
              />

              <HStack>
                <Input
                  w={'xxs'}
                  placeholder="Title"
                  value={newItem.title}
                  onChange={(e) =>
                    setNewItem({ ...newItem, title: e.target.value })
                  }
                />
                <Input
                  w={'xxs'}
                  placeholder="Value"
                  value={newItem.value}
                  onChange={(e) =>
                    setNewItem({ ...newItem, value: e.target.value })
                  }
                />
                <Button
                  size={'sm'}
                  onClick={() => handleAddItem('intro')}
                  colorScheme="orange"
                >
                  Add to Intro
                </Button>
                <Button
                  size={'sm'}
                  onClick={() => handleAddItem('shootingProgress')}
                  colorScheme="orange"
                >
                  Add to Shooting Progress
                </Button>
                <Button
                  size={'sm'}
                  onClick={() => handleAddItem('footer')}
                  colorScheme="orange"
                >
                  Add to Footer
                </Button>
              </HStack>

              {/* Intro Table */}
              <VStack align="stretch" spacing={4}>
                <Heading size="md">Intro</Heading>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Title</Th>
                      <Th>Value</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {intro.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.title}</Td>
                        <Td>{item.value}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </VStack>

              {/* Shooting Progress Table */}
              <VStack align="stretch" spacing={4}>
                <Heading size="md">Shooting Progress</Heading>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Title</Th>
                      <Th>Value</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {shootingProgress.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.title}</Td>
                        <Td>{item.value}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </VStack>

              {/* Footer Table */}
              <VStack align="stretch" spacing={4}>
                <Heading size="md">Footer</Heading>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Title</Th>
                      <Th>Value</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {footer.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.title}</Td>
                        <Td>{item.value}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </VStack>
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
      </CustomModal>
    </Box>
  );
}

export default DailyReportForm;
