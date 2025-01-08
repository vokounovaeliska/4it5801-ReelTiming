import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { CheckIcon, CloseIcon, Search2Icon } from '@chakra-ui/icons';
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
} from '@chakra-ui/react';

import { GET_SHOOTING_DAYS_BY_PROJECT } from '@frontend/graphql/queries/GetShootingDaysByProject';
import { formatDateToDisplay } from '@frontend/modules/timesheets/utils/timeUtils';
import { Heading } from '@frontend/shared/design-system';

import { ShootingDayByProject } from '../interfaces/interface';

import DailyReportPreview from './DailyReportPreview';

type Props = {
  projectId: string;
};

const ShootingDaysList = ({ projectId }: Props) => {
  const { data, loading, error } = useQuery(GET_SHOOTING_DAYS_BY_PROJECT, {
    variables: { projectId },
  });

  const [selectedDay, setSelectedDay] = useState<ShootingDayByProject | null>(
    null,
  );

  if (loading)
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading shooting days...</Text>
      </Center>
    );

  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  const shootingDays = data?.shootingDaysByProject || [];

  const handlePreviewClick = (day: ShootingDayByProject) => {
    setSelectedDay(day);
  };

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
        <TableContainer overflowX="auto">
          <Table variant="simple" size="sm" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Day N.</Th>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th>Preview</Th>
              </Tr>
            </Thead>
            <Tbody>
              {shootingDays.map((day) => (
                <Tr key={day.id}>
                  <Td>{day.shooting_day_number}</Td>
                  <Td>{formatDateToDisplay(day.date)}</Td>
                  <Td textAlign="center">
                    {day.dailyReport ? (
                      <IconButton
                        size="xs"
                        icon={<CheckIcon />}
                        aria-label="Daily report created"
                      />
                    ) : (
                      <IconButton
                        size="xs"
                        aria-label="No daily report"
                        icon={<CloseIcon />}
                      />
                    )}
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

      <Box flex="3" p={4} display={selectedDay ? 'block' : 'none'}>
        {selectedDay && (
          <DailyReportPreview shootingDay={selectedDay} projectId={projectId} />
        )}
      </Box>
    </Box>
  );
};

export default ShootingDaysList;
