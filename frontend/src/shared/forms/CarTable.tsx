import React from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import { MdModeEdit } from 'react-icons/md';

import { Car } from '@frontend/modules/timesheets/interfaces';
import { currencyUtil } from '@shared/currencyUtil';

import { showErrorToast } from '../design-system/molecules/toastUtils';

interface CarTableProps {
  carCollection: Car[];
  handleEditCar: (index: number) => void;
  isCarDeletable: (carId: string) => boolean;
  onDeleteAlertOpen: () => void;
  setCarToDeleteIndex: React.Dispatch<React.SetStateAction<number | null>>;
  projectCurrency: string;
}

export const CarTable: React.FC<CarTableProps> = ({
  carCollection,
  handleEditCar,
  isCarDeletable,
  onDeleteAlertOpen,
  setCarToDeleteIndex,
  projectCurrency,
}) => (
  <Box mt={6}>
    <TableContainer overflowX="auto">
      <Table variant="simple" size="sm" colorScheme="gray">
        <Thead>
          <Tr>
            <Th position="sticky" left={0} zIndex={1} bg="white">
              Name
            </Th>
            <Th>Included kms</Th>
            <Th>Extra km price</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {carCollection.map((car, index) => (
            <Tr key={index}>
              <Td position="sticky" left={0} zIndex={1} bg="white">
                {car.name}
              </Td>
              <Td>{car.kilometer_allow}</Td>
              <Td>
                {currencyUtil.formatAmountPerKM(
                  car.kilometer_rate,
                  projectCurrency,
                )}
              </Td>
              <Td>
                <Flex justifyContent="center" gap={2}>
                  <IconButton
                    colorScheme="gray"
                    size="xs"
                    onClick={() => handleEditCar(index)}
                    aria-label="Edit car"
                    icon={<MdModeEdit />}
                  />
                  <Tooltip
                    label={
                      isCarDeletable(car.id)
                        ? ''
                        : 'Car is not deletable due to existing car statement!'
                    }
                    bg="red.600"
                    color="white"
                    fontSize="sm"
                    placement="top"
                    hasArrow
                  >
                    <IconButton
                      colorScheme="red"
                      size="xs"
                      onClick={() => {
                        if (isCarDeletable(car.id)) {
                          setCarToDeleteIndex(index);
                          onDeleteAlertOpen();
                        } else {
                          showErrorToast(
                            'This car is associated with statements and cannot be deleted.',
                          );
                        }
                      }}
                      aria-label="Delete car"
                      icon={<DeleteIcon />}
                      isDisabled={!isCarDeletable(car.id)}
                    />
                  </Tooltip>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  </Box>
);
