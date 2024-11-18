import React, { useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { TimesheetFormValues, TimesheetsFormProps } from '../interfaces';
import { formatDate, formatTime, toLocalISOString } from '../utils/timeUtils';

export const TimesheetsForm: React.FC<TimesheetsFormProps> = ({
  // projectId,
  initialValues = {
    // start_date: new Date().toISOString().split('T')[0],
    start_date: toLocalISOString(new Date()).split('T')[0],
    // end_date: new Date().toISOString().split('T')[0],
    end_date: toLocalISOString(new Date()).split('T')[0],
    shift_lenght: 10,
    from: '',
    to: '',
    calculated_overtime: 0,
    claimed_overtime: 0,
    projectUser: {
      id: '',
    },
  },
  onClose,
  mode,
  onSubmit,
  userRole,
  userOptions,
  userInfo,
}) => {
  const { handleSubmit, control, setValue } = useForm<TimesheetFormValues>({
    defaultValues: {
      ...initialValues,
      from: formatTime(initialValues.from) || '',
      to: formatTime(initialValues.to) || '',
      start_date:
        initialValues?.start_date || toLocalISOString(new Date()).split('T')[0],
      shift_lenght: initialValues.shift_lenght || 10,
      projectUser: {
        id: initialValues.projectUser.id || userInfo?.id,
      },
    },
  });

  const from = useWatch({ control, name: 'from' });
  const to = useWatch({ control, name: 'to' });
  const shift = useWatch({ control, name: 'shift_lenght' });

  useEffect(() => {
    if (from && to && shift) {
      const fromTime = new Date(`1970-01-01T${from}:00`);
      let toTime = new Date(`1970-01-01T${to}:00`);
      // check if the end time is earlier than the start time (overnight shift)
      if (toTime < fromTime) {
        toTime.setDate(toTime.getDate() + 1);
      }

      const workedHours =
        (toTime.getTime() - fromTime.getTime()) / (1000 * 60 * 60);

      if (workedHours > shift) {
        const overtime = Math.ceil(workedHours - shift);
        setValue('calculated_overtime', overtime);
        setValue('claimed_overtime', overtime);
      } else {
        setValue('calculated_overtime', 0);
        setValue('claimed_overtime', 0);
      }
    }
  }, [from, to, shift, setValue]);
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      {userRole === 'ADMIN' && mode === 'add' && (
        <FormControl>
          <FormLabel>User</FormLabel>
          <Controller
            name="projectUser.id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
              >
                {userOptions.map((user) => (
                  <option key={user.value} value={user.value}>
                    {user.label}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>
      )}
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
      <Box
        display={{ base: 'grid', sm: 'flex' }}
        justifyContent="right"
        textAlign="center"
        gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr' }}
        gap="5"
        pb="2"
      >
        <Button mt={4} ml={2} onClick={onClose}>
          Cancel
        </Button>
        <Button mt={4} colorScheme="orange" type="submit">
          {mode === 'add' ? 'Add' : 'Save'}
        </Button>
      </Box>
    </Box>
  );
};
