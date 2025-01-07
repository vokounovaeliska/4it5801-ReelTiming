import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';

export type ShootingDay = {
  id: string;
  dayNumber: number;
  shootingDayDate: string;
};

interface ShootingDaysInputFormProps {
  shootingDay: ShootingDay;
  setShootingDay: React.Dispatch<React.SetStateAction<ShootingDay>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddOrUpdateShootingDay: () => void;
  shootingDaysLenght: number;
}

export const ShootingDaysInputForm: React.FC<ShootingDaysInputFormProps> = ({
  shootingDay,
  setShootingDay,
  isEditing,
  setIsEditing,
  handleAddOrUpdateShootingDay,
  shootingDaysLenght,
}) => {
  return (
    <>
      <SimpleGrid
        columns={{ base: 1, sm: 4 }}
        spacing={4}
        alignItems="flex-end"
        justifyContent="space-between"
        gridTemplateColumns={{ base: '1.5fr', sm: '0.5fr 1fr 0.5fr auto' }}
      >
        <FormControl>
          <FormLabel>Shooting Day Number</FormLabel>
          <Input
            name="dayNumber"
            type="number"
            value={shootingDay.dayNumber}
            onChange={(e) =>
              setShootingDay((prev) => ({
                ...prev,
                dayNumber: parseInt(e.target.value, 10) || 0,
              }))
            }
            isRequired
            autoComplete="off"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Shooting Day Date</FormLabel>
          <Input
            name="shootingDayDate"
            type="date"
            value={shootingDay.shootingDayDate}
            onChange={(e) =>
              setShootingDay((prev) => ({
                ...prev,
                shootingDayDate: e.target.value,
              }))
            }
            isRequired
            autoComplete="off"
          />
        </FormControl>
        <Box
          display="flex"
          justifyContent={{ base: 'center', md: 'flex-end' }}
          w="100%"
        >
          {isEditing ? (
            <>
              <Button
                colorScheme="red"
                onClick={() => {
                  setShootingDay({
                    id: '',
                    dayNumber: shootingDaysLenght + 1,
                    shootingDayDate: '',
                  });
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleAddOrUpdateShootingDay}
                mr={2}
              >
                Update
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              colorScheme="orange"
              onClick={handleAddOrUpdateShootingDay}
            >
              Add Shooting Day
            </Button>
          )}
        </Box>
      </SimpleGrid>
    </>
  );
};
