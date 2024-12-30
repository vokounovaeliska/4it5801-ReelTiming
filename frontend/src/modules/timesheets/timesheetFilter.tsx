import React from 'react';
import Select, { ActionMeta, MultiValue } from 'react-select';

import {
  Box,
  FormControl,
  FormLabel,
  Input,
} from '@frontend/shared/design-system';

import { UserOption } from './interfaces';

export type FormSectionProps = {
  startDate: string;
  endDate: string;
  userRole: string;
  handleDateChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'start' | 'end',
  ) => void;
  userOptions: UserOption[];
  handleUserChange: (
    newValue: MultiValue<UserOption>,
    actionMeta: ActionMeta<UserOption>,
  ) => void;
};

export function TimesheetFilter({
  startDate,
  endDate,
  userRole,
  handleDateChange,
  userOptions,
  handleUserChange,
}: FormSectionProps) {
  return (
    <Box
      display={{ base: 'grid', md: 'flex' }}
      justifyItems={{ base: 'center', sm: 'flex-start' }}
      gap="4"
      px={{ base: '8', sm: '2' }}
      pb={{ base: '4', sm: '2' }}
      pt={{ base: '0', sm: '4' }}
    >
      <Box
        display={{ base: 'grid', sm: 'flex' }}
        gap="4"
        width={{ base: '100%', sm: 'auto' }}
      >
        <Box width={{ base: '100%', sm: 'auto' }}>
          <FormControl>
            <FormLabel>Date from</FormLabel>
            <Input
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => handleDateChange(e, 'start')}
              width={{ base: '100%', sm: '200px', lg: '300px' }}
            />
          </FormControl>
        </Box>
        <Box width={{ base: '100%', sm: 'auto' }}>
          <FormControl>
            <FormLabel>Date to</FormLabel>
            <Input
              borderWidth={2}
              borderColor={'gray.200'}
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => handleDateChange(e, 'end')}
              width={{ base: '100%', sm: '200px', lg: '300px' }}
            />
          </FormControl>
        </Box>
      </Box>

      {userRole === 'ADMIN' && (
        <Box width={{ base: '100%', sm: 'auto' }}>
          <FormControl>
            <FormLabel>Filter users</FormLabel>
            <Select
              isMulti
              options={userOptions}
              placeholder="Select Users"
              onChange={handleUserChange}
              styles={{
                container: (provided) => ({
                  ...provided,
                  width: '100%',
                  maxWidth: '350px',
                  minWidth: '250px',
                  zIndex: 100,
                }),
              }}
            />
          </FormControl>
        </Box>
      )}
    </Box>
  );
}
