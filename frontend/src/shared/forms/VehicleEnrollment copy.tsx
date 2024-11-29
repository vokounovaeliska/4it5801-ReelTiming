import { useState } from 'react';
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

import { Form, InputField } from './molecules';
import { zod, zodResolver } from '.';

const schema = zod.object({
  vehicle_name: zod.string().min(1),
  included_mileage: zod.number().min(1),
  extra_mileage: zod.number().min(1),
});

// Define the Car type
interface Car {
  vehicle_name: string;
  milage: string;
  km_price: string;
}

// export type VehicleFormValues = zod.infer<typeof schema>;

export function CarFormWithTable() {
  // Strongly typed state for car details and the collection
  const [carDetails, setCarDetails] = useState<Car>({
    vehicle_name: '',
    milage: '',
    km_price: '',
  });

  const initialValues: VehicleFormValues = {
    vehicle_name: '',
    included_mileage: 0,
    extra_mileage: 0,
  };

  const [carCollection, setCarCollection] = useState<Car[]>([]);

  const handleAddCar = () => {
    // Validate that all fields are filled
    if (
      carDetails.vehicle_name.trim() &&
      carDetails.milage.trim() &&
      carDetails.km_price.trim()
    ) {
      // Add the car details to the collection
      setCarCollection([...carCollection, carDetails]);
      // Clear the input fields
      setCarDetails({ vehicle_name: '', milage: '', km_price: '' });
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
    <Box display="block" p="2">
      <Form
        onSubmit={() => {}}
        resolver={zodResolver(schema)}
        defaultValues={initialValues}
        noValidate
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <Box>
            <InputField
              name="vehicle_name"
              type="text"
              value={carDetails.vehicle_name}
              label="Vehicle Name"
              placeholder="ex. personal, van, truck..."
              onChange={(e) =>
                setCarDetails({ ...carDetails, vehicle_name: e.target.value })
              }
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginTop: '4px',
              }}
            />
          </Box>
          <Box>
            <InputField
              name="included_mileage"
              label="Included mileage"
              type="text"
              value={carDetails.milage}
              placeholder="ex. 50"
              onChange={(e) =>
                setCarDetails({ ...carDetails, milage: e.target.value })
              }
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginTop: '4px',
              }}
            />
          </Box>
          <Box>
            <InputField
              name="extra_mileage"
              label="Extra Mileage Price"
              type="text"
              value={carDetails.km_price}
              placeholder="ex. 10"
              onChange={(e) =>
                setCarDetails({ ...carDetails, km_price: e.target.value })
              }
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginTop: '4px',
              }}
            />
          </Box>
        </SimpleGrid>

        {/* Add Car Button */}
        <Box display="flex" justifyContent="flex-end" mt={4}>
          <Button colorScheme="orange" onClick={handleAddCar}>
            Add Car
          </Button>
        </Box>

        {/* Display Table */}
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
