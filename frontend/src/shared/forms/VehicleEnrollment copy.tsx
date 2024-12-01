import React, { useState } from 'react';
import {
  Box,
  Button,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { Form, InputField, zod, zodResolver } from '@frontend/shared/forms';

export const carSchema = zod.object({
  vehicle_name: zod.string().min(1, { message: 'Vehicle name is required' }),
  included_mileage: zod
    .number()
    .nonnegative({ message: 'Must be a non-negative number' }),
  extra_mileage: zod
    .number()
    .nonnegative({ message: 'Must be a non-negative number' }),
});

export type Car = zod.infer<typeof carSchema>;

const initialValues: Car = {
  vehicle_name: '',
  included_mileage: 0,
  extra_mileage: 0,
};

interface CarFormWithTableProps {
  onCarCollectionChange: (cars: Car[]) => void;
  cars: Car[];
}

export const CarFormWithTable: React.FC<CarFormWithTableProps> = ({
  onCarCollectionChange,
  cars,
}) => {
  const [carCollection, setCarCollection] = useState<Car[]>(cars);

  const handleAddCar = (data: Car) => {
    const updatedCars = [...carCollection, data];
    setCarCollection(updatedCars);
    onCarCollectionChange(updatedCars);
  };

  const handleRemoveCar = (index: number) => {
    const updatedCars = carCollection.filter((_, i) => i !== index);
    setCarCollection(updatedCars);
    onCarCollectionChange(updatedCars);
  };

  return (
    <Box display="block" p="4">
      {/* Form */}
      <Form
        onSubmit={(data) => {
          handleAddCar(data);
        }}
        defaultValues={initialValues}
        resolver={zodResolver(carSchema)}
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <InputField
            name="vehicle_name"
            label="Vehicle Name"
            placeholder="e.g., personal, van, truck..."
          />
          <InputField
            name="included_mileage"
            label="Included Mileage"
            type="number"
            placeholder="e.g., 50"
          />
          <InputField
            name="extra_mileage"
            label="Extra Mileage Price"
            type="number"
            placeholder="e.g., 10"
          />
        </SimpleGrid>

        <Box display="flex" justifyContent="flex-end" mt={4}>
          <Button colorScheme="orange" type="submit">
            Add Car
          </Button>
        </Box>
      </Form>

      <Box mt={6}>
        <Table variant="striped" colorScheme="gray">
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
    </Box>
  );
};
