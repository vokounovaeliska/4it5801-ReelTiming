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

type ShootingDay = {
  id: string;
  dayNumber: number;
  shootingDayDate: string;
};

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
    <TableContainer mt={6}>
      <Table variant="simple" size="sm" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Day Number</Th>
            <Th>Date</Th>
            <Th textAlign="center">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {shootingDaysCollection.map((day, index) => (
            <Tr key={day.id}>
              <Td>{day.dayNumber}</Td>
              <Td>{day.shootingDayDate}</Td>
              <Td textAlign="center">
                <Flex justify="center" gap={2}>
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    size="sm"
                    aria-label="Edit Shooting Day"
                    onClick={() => handleEditShootingDay(index)}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
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
