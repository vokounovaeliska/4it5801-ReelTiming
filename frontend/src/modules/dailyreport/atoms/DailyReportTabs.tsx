import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

import { GET_DAILY_REPORT_PREVIEW_INFO } from '@frontend/graphql/queries/GetDailyReportPreviewInfo';
import PDFGenerator from '@frontend/modules/dailyreport/pdf/PdfGenerator';

import { Divider } from '../../../shared/design-system/atoms/Divider';
import {
  DailyReportPreviewInfoQuery,
  ShootingDayByProject,
} from '../interfaces/interface';

import { ReportCrewStatementsTable } from './preview/ReportCrewStatementsTable';
import ReportFooter from './preview/ReportFooter';
import ReportHeader from './preview/ReportHeader';
import ReportIntro from './preview/ReportIntro';

type DailyReportTabsProps = {
  shootingDay?: ShootingDayByProject;
  projectId: string;
  onEdit: () => void;
  onDelete: () => void;
};

const DailyReportTabs = ({
  shootingDay,
  projectId,
  onEdit,
  onDelete,
}: DailyReportTabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const { data, loading, error } = useQuery<DailyReportPreviewInfoQuery>(
    GET_DAILY_REPORT_PREVIEW_INFO,
    {
      variables: {
        projectId,
        date: shootingDay?.date,
        shootingDayId: shootingDay?.id,
      },
      skip: !projectId || !shootingDay?.date || !shootingDay?.id,
      fetchPolicy: 'cache-and-network',
    },
  );

  if (!shootingDay) {
    return (
      <Box textAlign="center" color="gray.500">
        Select a shooting day to view details.
      </Box>
    );
  }

  if (loading)
    return (
      <Center minHeight="30vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading data...</Text>
      </Center>
    );

  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  return (
    <Box>
      {/* Desktop view */}
      <Box display={{ base: 'none', md: 'block' }}>
        <Tabs
          variant="enclosed"
          colorScheme="orange"
          size="lg"
          index={activeTab}
          onChange={(index) => setActiveTab(index)}
        >
          <TabList>
            <Tab>Preview</Tab>
            <Tab>PDF</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box textAlign={'right'} mb={8}>
                <Button
                  leftIcon={<EditIcon />}
                  colorScheme="gray"
                  borderWidth={3}
                  onClick={onEdit}
                >
                  Edit Daily Report
                </Button>
                <Button
                  ml={4}
                  leftIcon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={onDelete}
                >
                  Delete
                </Button>
              </Box>
              <Box>
                <ReportHeader data={data} />
                <Divider />
                <ReportIntro data={data} />
                <Divider />
                <ReportCrewStatementsTable data={data} />
                <Divider />
                <ReportFooter data={data} />
              </Box>
            </TabPanel>

            <TabPanel>
              <PDFGenerator data={data} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      {/* Mobile view */}
      <Box flex="5" p={4} display={{ base: 'block', md: 'none' }}>
        <PDFGenerator data={data} />
      </Box>
    </Box>
  );
};

export default DailyReportTabs;
