import { useQuery } from '@apollo/client';
import { Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Flex,
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

type Props = {
  projectId: string;
};

export const ShootingDaysList = ({ projectId }: Props) => {
  const { data, loading, error } = useQuery(GET_SHOOTING_DAYS_BY_PROJECT, {
    variables: { projectId },
  });

  if (loading)
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading shooting days...</Text>
      </Center>
    );

  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  const shootingDays = data?.shootingDaysByProject || [];

  return (
    <Box>
      <Heading as="h3" pb={4} pl={4}>
        Shooting Days
      </Heading>
      <TableContainer overflowX="auto">
        <Table variant="simple" size="sm" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Day Number</Th>
              <Th>Date</Th>
              <Th>Preview</Th>
            </Tr>
          </Thead>
          <Tbody>
            {shootingDays.map((day) => (
              <Tr key={day.id}>
                <Td>{day.shooting_day_number}</Td>
                <Td>{formatDateToDisplay(day.date)}</Td>
                <Td>
                  <Flex justifyContent="center" gap={2}>
                    <IconButton
                      colorScheme="orange"
                      size="xs"
                      onClick={() =>
                        console.log(`Preview shooting day ${day.id}`)
                      }
                      aria-label="Edit shooting day"
                      icon={<Search2Icon />}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
