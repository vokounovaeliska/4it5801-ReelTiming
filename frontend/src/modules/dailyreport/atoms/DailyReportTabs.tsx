import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

import { GET_DAILY_REPORT_PREVIEW_INFO } from '@frontend/graphql/queries/GetDailyReportPreviewInfo';
import PDFGenerator from '@frontend/modules/dailyreport/pdf/PdfGenerator';
import { LoadingSpinner } from '@frontend/shared/design-system/atoms/LoadingSpinner';

import { Divider } from '../../../shared/design-system/atoms/Divider';
import {
  DailyReportPreviewInfoQuery,
  Project,
  ShootingDayByProject,
} from '../interfaces/interface';

import { ReportCrewStatementsTable } from './preview/ReportCrewStatementsTable';
import ReportFooter from './preview/ReportFooter';
import ReportHeader from './preview/ReportHeader';
import ReportIntro from './preview/ReportIntro';

type DailyReportTabsProps = {
  shootingDay?: ShootingDayByProject;
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
};

const DailyReportTabs = ({
  shootingDay,
  project,
  onEdit,
  onDelete,
}: DailyReportTabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const { data, loading, error } = useQuery<DailyReportPreviewInfoQuery>(
    GET_DAILY_REPORT_PREVIEW_INFO,
    {
      variables: {
        projectId: project.id,
        date: shootingDay?.date,
        shootingDayId: shootingDay?.id,
      },
      skip: !project.id || !shootingDay?.date || !shootingDay?.id,
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
    return <LoadingSpinner centerProps={{ minHeight: '30vh' }} title="data" />;

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
                  isDisabled={!project.is_active}
                >
                  Edit Daily Report
                </Button>
                <Button
                  ml={4}
                  leftIcon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={onDelete}
                  isDisabled={!project.is_active}
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
