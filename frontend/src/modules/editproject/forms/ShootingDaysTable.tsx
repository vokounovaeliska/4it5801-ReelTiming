import React from 'react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

import { ShootingDay } from '@frontend/gql/graphql';

interface ShootingDaysTableProps {
  shootingDaysCollection: ShootingDay[];
  handleEditShootingDay: (index: number) => void;
  handleDeleteShootingDay: (index: number) => void;
}

export const ShootingDaysTable: React.FC<ShootingDaysTableProps> = ({
  shootingDaysCollection,
  handleEditShootingDay,
  handleDeleteShootingDay,
}) => {
  return (
    <TableContainer mt={6} maxH="400px" overflowY="auto">
      <Table variant="simple" size="sm" colorScheme="gray">
        <Thead>
          <Tr>
            <Th
              position="sticky"
              top={0}
              bg="white"
              zIndex="docked"
              textAlign="left"
            >
              Day Number
            </Th>
            <Th
              position="sticky"
              top={0}
              bg="white"
              zIndex="docked"
              textAlign="left"
            >
              Date
            </Th>
            <Th
              position="sticky"
              top={0}
              bg="white"
              zIndex="docked"
              textAlign="center"
            >
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {shootingDaysCollection.map((day, index) => (
            <Tr key={day.id}>
              <Td>{day.shooting_day_number}</Td>
              <Td>{format(parseISO(day.date), 'yyyy-MM-dd')}</Td>
              <Td textAlign="center">
                <Flex justify="center" gap={2}>
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="gray"
                    size="xs"
                    aria-label="Edit Shooting Day"
                    onClick={() => handleEditShootingDay(index)}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    size="xs"
                    aria-label="Delete Shooting Day"
                    onClick={() => handleDeleteShootingDay(index)}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
