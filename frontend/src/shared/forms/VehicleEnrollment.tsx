import React, { useState } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { MdModeEdit } from 'react-icons/md';

import { Car } from '@frontend/modules/timesheets/interfaces';
import { Form } from '@frontend/shared/forms';

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

  const handleAddCar = () => {
    // Validate fields
    if (carDetails.name.trim()) {
      const updatedCarCollection = [
        ...carCollection,
        { ...carDetails, id: `${Date.now()}` },
      ];
      setCarCollection(updatedCarCollection); // Add car to collection
      setCarDetails({
        id: '',
        name: '',
        kilometer_allow: 0,
        kilometer_rate: 0,
      });
      onCarCollectionChange(updatedCarCollection);
    } else {
      alert('Please fill out all fields before adding a car.');
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
      setCarCollection(updatedCarCollection); // Update car in collection
      setCarDetails({
        id: '',
        name: '',
        kilometer_allow: 0,
        kilometer_rate: 0,
      }); // Reset fields
      setIsEditMode(false);
      onCarCollectionChange(updatedCarCollection);
    } else {
      alert('Please fill out all fields before updating a car.');
    }
  };

  return (
    <Box display="block" p="4">
      <Form onSubmit={() => {}}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
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
            <FormLabel>Included Mileage</FormLabel>
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
            <FormLabel>Extra Mileage Price</FormLabel>
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
        </SimpleGrid>

        <Box display="flex" justifyContent="flex-end" mt={4}>
          {isEditMode ? (
            <Button colorScheme="blue" onClick={handleUpdateCar}>
              Update Car
            </Button>
          ) : (
            <Button colorScheme="orange" onClick={handleAddCar}>
              Add Car
            </Button>
          )}
        </Box>

        <Box mt={6}>
          <Table variant="simple" size="sm" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Vehicle Name</Th>
                <Th>Included Mileage</Th>
                <Th>Extra Mileage Price</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {carCollection.map((car, index) => (
                <Tr key={index}>
                  <Td>{car.name}</Td>
                  <Td>{car.kilometer_allow}</Td>
                  <Td>{car.kilometer_rate}</Td>
                  <Td>
                    <Flex justifyContent="center" gap={2}>
                      <IconButton
                        colorScheme="blue"
                        size="xs"
                        onClick={() => handleEditCar(index)}
                        aria-label="Delete timesheet"
                        icon={<MdModeEdit />}
                      >
                        Edit
                      </IconButton>
                      <IconButton
                        colorScheme="red"
                        size="xs"
                        onClick={() => handleRemoveCar(index)}
                        aria-label="Delete timesheet"
                        icon={<DeleteIcon />}
                      >
                        Remove
                      </IconButton>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Form>
    </Box>
  );
};
