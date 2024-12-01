import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { Form } from '@frontend/shared/forms';

export interface Car {
  vehicle_name: string;
  included_mileage: number;
  extra_mileage: number;
}

interface CarFormWithTableProps {
  onCarCollectionChange: (cars: Car[]) => void;
  cars: Car[];
}

export const CarFormWithTable: React.FC<CarFormWithTableProps> = ({
  onCarCollectionChange,
  cars,
}) => {
  const [carDetails, setCarDetails] = useState<Car>({
    vehicle_name: '',
    included_mileage: 0,
    extra_mileage: 0,
  });

  const [carCollection, setCarCollection] = useState<Car[]>(cars);

  const handleAddCar = () => {
    // Validate fields
    if (carDetails.vehicle_name.trim()) {
      const updatedCarCollection = [...carCollection, carDetails];
      setCarCollection(updatedCarCollection); // Add car to collection
      setCarDetails({
        vehicle_name: '',
        included_mileage: 0,
        extra_mileage: 0,
      }); // Reset fields
      console.log('Car details:', carDetails); // Log state for debugging
      onCarCollectionChange(updatedCarCollection);
    } else {
      alert('Please fill out all fields before adding a car.');
    }
  };

  const handleRemoveCar = (indexToRemove: number) => {
    // Remove the car at the specified index
    setCarCollection((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
    onCarCollectionChange(carCollection);
  };

  return (
    <Box display="block" p="4">
      <Form onSubmit={() => {}}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <FormControl>
            <FormLabel>Vehicle Name</FormLabel>
            <Input
              value={carDetails.vehicle_name}
              placeholder="ex. personal, van, truck..."
              onChange={(e) =>
                setCarDetails({ ...carDetails, vehicle_name: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Included Mileage</FormLabel>
            <Input
              value={carDetails.included_mileage}
              placeholder="ex. 50"
              type="number"
              onChange={(e) =>
                setCarDetails({
                  ...carDetails,
                  included_mileage: parseFloat(e.target.value),
                })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Extra Mileage Price</FormLabel>
            <Input
              value={carDetails.extra_mileage}
              placeholder="ex. 10"
              type="number"
              onChange={(e) =>
                setCarDetails({
                  ...carDetails,
                  extra_mileage: parseFloat(e.target.value),
                })
              }
            />
          </FormControl>
        </SimpleGrid>

        <Box display="flex" justifyContent="flex-end" mt={4}>
          <Button colorScheme="orange" onClick={handleAddCar}>
            Add Car
          </Button>
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
                  <Td>{car.vehicle_name}</Td>
                  <Td>{car.included_mileage}</Td>
                  <Td>{car.extra_mileage}</Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleRemoveCar(index)}
                    >
                      Remove
                    </Button>
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
