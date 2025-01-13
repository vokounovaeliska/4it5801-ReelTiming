import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';

import { ShootingDay } from '@frontend/gql/graphql';

interface ShootingDaysInputFormProps {
  shootingDay: ShootingDay;
  setShootingDay: React.Dispatch<React.SetStateAction<ShootingDay>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddOrUpdateShootingDay: () => void;
  shootingDays: ShootingDay[];
  setNewShootingDay: (shootinDays: ShootingDay[]) => void;
}

export const ShootingDaysInputForm: React.FC<ShootingDaysInputFormProps> = ({
  shootingDay,
  setShootingDay,
  isEditing,
  setIsEditing,
  handleAddOrUpdateShootingDay,
  shootingDays,
  setNewShootingDay,
}) => {
  return (
    <>
      <SimpleGrid
        columns={{ base: 1, md: 4 }}
        spacing={4}
        alignItems="flex-end"
        justifyContent="space-between"
        gridTemplateColumns={{ base: '1.5fr', md: '0.5fr 1fr 0.7fr auto' }}
      >
        <FormControl>
          <FormLabel>Shooting Day Number</FormLabel>
          <Input
            name="dayNumber"
            type="number"
            value={shootingDay.shooting_day_number}
            onChange={(e) =>
              setShootingDay((prev) => ({
                ...prev,
                shooting_day_number: parseInt(e.target.value, 10) || 0,
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
            value={shootingDay.date}
            onChange={(e) =>
              setShootingDay((prev) => ({
                ...prev,
                date: e.target.value,
              }))
            }
            isRequired
            autoComplete="off"
          />
        </FormControl>
        <Box
          display="flex"
          justifyContent={{ base: 'center', md: 'flex-end' }}
          gap={1}
          w="100%"
        >
          {isEditing ? (
            <>
              <Button
                colorScheme="gray"
                onClick={handleAddOrUpdateShootingDay}
                mr={2}
              >
                Update
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  setNewShootingDay(shootingDays);
                  setIsEditing(false);
                }}
              >
                Cancel
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
