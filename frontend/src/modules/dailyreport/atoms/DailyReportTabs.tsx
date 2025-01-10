import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
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
};

const DailyReportTabs = ({ shootingDay, projectId }: DailyReportTabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(0); // Tab index state

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
    <>
      <Box p={4} display={{ base: 'none', md: 'block' }}>
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
      <Box display={{ base: 'block', md: 'none' }}>
        <PDFGenerator data={data} />
      </Box>
    </>
  );
};

export default DailyReportTabs;
