import React, { useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import { currencyUtil } from '@shared/currencyUtil';

import { Car, CarSectionProps } from '../interfaces';

const CarSection: React.FC<CarSectionProps> = ({
  control,
  selectedCar,
  setSelectedCar,
  selectedCarDetails,
  setSelectedCarDetails,
  setClaimedKilometers,
  getAvailableCars,
  projectCurrency,
  setValue,
}) => {
  useEffect(() => {
    if (selectedCar) {
      const car = getAvailableCars().find((car: Car) => car.id === selectedCar);
      setSelectedCarDetails(car || null);
    } else {
      setSelectedCarDetails(null);
    }
  }, [selectedCar, getAvailableCars, setSelectedCarDetails]);
  return (
    <Box>
      {getAvailableCars().length > 0 && (
        <>
          <FormControl>
            <FormLabel>Car</FormLabel>
            <Controller
              name="carId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={(e) => {
                    const selectedCarId = e.target.value;
                    field.onChange(selectedCarId);
                    setSelectedCar(selectedCarId);
                    if (selectedCarId === '') {
                      setSelectedCar(null);
                      setSelectedCarDetails(null);
                      setValue('kilometers', 0);
                      setClaimedKilometers(0);
                    }
                  }}
                  value={selectedCar || ''}
                >
                  <option value="">-</option>
                  {getAvailableCars().map((car: Car) => (
                    <option key={car.id} value={car.id}>
                      {car.name}
                    </option>
                  ))}
                </Select>
              )}
            />
            {selectedCarDetails && (
              <Text color="gray.500">
                kilometers allow: {selectedCarDetails?.kilometer_allow ?? '-'}{' '}
                km,
              </Text>
            )}
            {selectedCarDetails && (
              <Text color="gray.500" mb={1}>
                kilometer rate{' '}
                {currencyUtil.formatAmountPerKM(
                  selectedCarDetails?.kilometer_rate,
                  projectCurrency,
                  2,
                )}
              </Text>
            )}
          </FormControl>
          <FormControl>
            <FormLabel mt={2}>Total kilometers</FormLabel>
            <Controller
              name="kilometers"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    field.onChange(value);
                    setClaimedKilometers(value);
                  }}
                  value={field.value}
                />
              )}
            />
          </FormControl>
        </>
      )}
    </Box>
  );
};

export default CarSection;
