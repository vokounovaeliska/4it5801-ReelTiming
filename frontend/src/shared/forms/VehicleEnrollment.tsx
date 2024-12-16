import React, { useRef, useState } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { FaCarSide } from 'react-icons/fa6';
import { MdModeEdit } from 'react-icons/md';

import { Car } from '@frontend/modules/timesheets/interfaces';

import { showErrorToast } from '../design-system/molecules/toastUtils';

interface CarFormWithTableProps {
  onCarCollectionChange: (cars: Car[]) => void;
  cars: Car[] | null;
}

export const CarFormWithTable: React.FC<CarFormWithTableProps> = ({
  onCarCollectionChange,
  cars,
}) => {
  const [carDetails, setCarDetails] = useState<Car>({
    id: '',
    name: '',
    kilometer_allow: 0,
    kilometer_rate: 0,
  });

  const [carCollection, setCarCollection] = useState<Car[]>(cars ? cars : []);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose,
  } = useDisclosure();
  const cancelRef = useRef(null);
  const [carToDeleteIndex, setCarToDeleteIndex] = useState<number | null>(null);

  const handleAddCar = () => {
    if (carDetails.kilometer_allow <= 0) {
      showErrorToast('Allowed kilometers has to be greater than 0!');
    }
    if (carDetails.kilometer_rate <= 0) {
      showErrorToast('Extra km price has to be greater than 0!');
    }
    if (carDetails.name.trim()) {
      const updatedCarCollection = [
        ...carCollection,
        { ...carDetails, id: `${Date.now()}` },
      ];
      setCarCollection(updatedCarCollection);
      setCarDetails({
        id: '',
        name: '',
        kilometer_allow: 0,
        kilometer_rate: 0,
      });
      onCarCollectionChange(updatedCarCollection);
    } else {
      showErrorToast('Name has to be filled!');
    }
  };

  const handleRemoveCar = (indexToRemove: number) => {
    setCarCollection((prev) => {
      const updatedCarCollection = prev.filter(
        (_, index) => index !== indexToRemove,
      );
      onCarCollectionChange(updatedCarCollection);
      return updatedCarCollection;
    });
  };

  const handleEditCar = (indexToEdit: number) => {
    const carToEdit = carCollection[indexToEdit];
    setCarDetails(carToEdit);
    setIsEditMode(true);
  };

  const handleUpdateCar = () => {
    if (carDetails.name.trim()) {
      const updatedCarCollection = carCollection.map((car) =>
        car.id === carDetails.id ? carDetails : car,
      );
      setCarCollection(updatedCarCollection);
      setCarDetails({
        id: '',
        name: '',
        kilometer_allow: 0,
        kilometer_rate: 0,
      });
      setIsEditMode(false);
      onCarCollectionChange(updatedCarCollection);
    } else {
      alert('Please fill out all fields before updating a car.');
    }
  };

  const handleCancelEdit = () => {
    setCarDetails({
      id: '',
      name: '',
      kilometer_allow: 0,
      kilometer_rate: 0,
    });
    setIsEditMode(false);
  };

  return (
    <Box display="block">
      <SimpleGrid
        columns={{ base: 1, md: 4 }}
        spacing={4}
        alignItems="flex-end"
        justifyContent="space-between"
        pb={4}
        gridTemplateColumns={{ base: '1fr', md: '1.5fr 1fr 1fr auto' }}
      >
        <FormControl>
          <FormLabel>Vehicle Name</FormLabel>
          <Input
            value={carDetails.name}
            placeholder="ex. personal, van, truck..."
            onChange={(e) =>
              setCarDetails({ ...carDetails, name: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Included kms</FormLabel>
          <Input
            value={carDetails.kilometer_allow}
            placeholder="ex. 50"
            type="number"
            onChange={(e) =>
              setCarDetails({
                ...carDetails,
                kilometer_allow: parseFloat(e.target.value),
              })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Extra km price</FormLabel>
          <Input
            value={carDetails.kilometer_rate}
            placeholder="ex. 10"
            type="number"
            onChange={(e) =>
              setCarDetails({
                ...carDetails,
                kilometer_rate: parseFloat(e.target.value),
              })
            }
          />
        </FormControl>
        <Box
          display="flex"
          justifyContent={{ base: 'center', md: 'flex-end' }}
          w="100%"
        >
          {isEditMode ? (
            <>
              <Button colorScheme="gray" onClick={handleUpdateCar} mr={2}>
                Save
              </Button>
              <Button colorScheme="red" onClick={handleCancelEdit}>
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant={'outline'}
              colorScheme="orange"
              onClick={handleAddCar}
              rightIcon={<FaCarSide />}
            >
              Add Car
            </Button>
          )}
        </Box>
      </SimpleGrid>

      {carCollection.length > 0 && (
        <Box mt={6}>
          <TableContainer overflowX="auto">
            <Table variant="simple" size="sm" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th
                    position="sticky"
                    left={0}
                    zIndex={1}
                    bg={{ base: 'ghostwhite', md: 'white' }}
                  >
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
                    <Td
                      position="sticky"
                      left={0}
                      bg={{ base: 'ghostwhite', md: 'white' }}
                      zIndex={1}
                    >
                      {car.name}
                    </Td>
                    <Td>{car.kilometer_allow}</Td>
                    <Td>{car.kilometer_rate}</Td>
                    <Td>
                      <Flex justifyContent="center" gap={2}>
                        <IconButton
                          colorScheme="gray"
                          size="xs"
                          onClick={() => handleEditCar(index)}
                          aria-label="Edit car"
                          icon={<MdModeEdit />}
                        />
                        <IconButton
                          colorScheme="red"
                          size="xs"
                          onClick={() => {
                            setCarToDeleteIndex(index);
                            onDeleteAlertOpen();
                          }}
                          aria-label="Delete car"
                          icon={<DeleteIcon />}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Car
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this car? This action cannot be
              undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteAlertClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  if (carToDeleteIndex !== null) {
                    handleRemoveCar(carToDeleteIndex);
                  }
                  onDeleteAlertClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};
