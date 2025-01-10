import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';
import { FaCarSide } from 'react-icons/fa6';

import { Car } from '@frontend/modules/timesheets/interfaces';

interface CarFormProps {
  carDetails: Car;
  setCarDetails: React.Dispatch<React.SetStateAction<Car>>;
  handleAddCar: () => void;
  handleUpdateCar: () => void;
  handleCancelEdit: () => void;
  isEditMode: boolean;
}

export const CarForm: React.FC<CarFormProps> = ({
  carDetails,
  setCarDetails,
  handleAddCar,
  handleUpdateCar,
  handleCancelEdit,
  isEditMode,
}) => (
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
        onChange={(e) => setCarDetails({ ...carDetails, name: e.target.value })}
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
          variant="outline"
          colorScheme="orange"
          onClick={handleAddCar}
          rightIcon={<FaCarSide />}
        >
          Add Car
        </Button>
      )}
    </Box>
  </SimpleGrid>
);
