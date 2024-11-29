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

interface Car {
  vehicle_name: string;
  milage: string;
  km_price: string;
}

export function CarFormWithTable() {
  const [carDetails, setCarDetails] = useState<Car>({
    vehicle_name: '',
    milage: '',
    km_price: '',
  });

  const [carCollection, setCarCollection] = useState<Car[]>([
    { vehicle_name: 'Van', milage: '50', km_price: '10' },
  ]);

  const handleAddCar = () => {
    console.log('Car details:', carDetails); // Log state for debugging

    // Validate fields
    if (
      carDetails.vehicle_name.trim() &&
      carDetails.milage.trim() &&
      carDetails.km_price.trim()
    ) {
      setCarCollection([...carCollection, carDetails]); // Add car to collection
      setCarDetails({ vehicle_name: '', milage: '', km_price: '' }); // Reset fields
    } else {
      alert('Please fill out all fields before adding a car.');
    }
  };

  const handleRemoveCar = (indexToRemove: number) => {
    // Remove the car at the specified index
    setCarCollection((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
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
              value={carDetails.milage}
              placeholder="ex. 50"
              onChange={(e) =>
                setCarDetails({ ...carDetails, milage: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Extra Mileage Price</FormLabel>
            <Input
              value={carDetails.km_price}
              placeholder="ex. 10"
              onChange={(e) =>
                setCarDetails({ ...carDetails, km_price: e.target.value })
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
                  <Td>{car.milage}</Td>
                  <Td>{car.km_price}</Td>
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
}
