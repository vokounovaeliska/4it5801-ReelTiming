import React from 'react';
import { Box, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import { OvertimeSectionProps } from '../interfaces';

const OvertimeSection = ({ control }: OvertimeSectionProps) => {
  return (
    <Box>
      <FormControl mt={4}>
        <FormLabel>Calculated Overtime</FormLabel>
        <Controller
          name="calculated_overtime"
          control={control}
          render={({ field }) => <Text>{field.value} h</Text>}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Claimed Overtime</FormLabel>
        <Controller
          name="claimed_overtime"
          control={control}
          render={({ field }) => (
            <Input
              type="number"
              {...field}
              onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
              value={field.value}
            />
          )}
        />
      </FormControl>
    </Box>
  );
};

export default OvertimeSection;
