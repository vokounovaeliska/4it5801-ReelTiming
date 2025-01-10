import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import { DateTimeSectionProps } from '../interfaces';
import { formatDate, formatTime } from '../utils/timeUtils';

const DateTimeSection = ({ control, workedHours }: DateTimeSectionProps) => {
  return (
    <Box>
      <FormControl>
        <FormLabel>Start Date</FormLabel>
        <Controller
          name="start_date"
          control={control}
          render={({ field }) => (
            <Input type="date" {...field} value={formatDate(field.value)} />
          )}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Shift</FormLabel>
        <Controller
          name="shift_lenght"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              <option value={10}>10h</option>
              <option value={12}>12h</option>
            </Select>
          )}
        />
      </FormControl>
      <Box
        display={{ base: 'grid', sm: 'flex' }}
        justifyContent="space-between"
        textAlign="center"
        gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr' }}
        gap="5"
      >
        <FormControl mt={4}>
          <FormLabel>Time From</FormLabel>
          <Controller
            name="from"
            control={control}
            render={({ field }) => (
              <Input
                type="time"
                {...field}
                value={formatTime(field.value)}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                }}
              />
            )}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Time To</FormLabel>
          <Controller
            name="to"
            control={control}
            render={({ field }) => (
              <Input
                type="time"
                {...field}
                value={formatTime(field.value)}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                }}
              />
            )}
          />
        </FormControl>
      </Box>
      <Text color="gray.500">
        {workedHours ? `worked ${workedHours} hours` : ''}
      </Text>
    </Box>
  );
};

export default DateTimeSection;
