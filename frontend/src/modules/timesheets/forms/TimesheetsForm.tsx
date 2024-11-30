import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Switch,
  Text,
} from '@chakra-ui/react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { TimesheetFormValues, TimesheetsFormProps } from '../interfaces';
import { getAvailableCarsForProjectUserId } from '../pages/TimesheetsPage';
import { formatDate, formatTime, toLocalISOString } from '../utils/timeUtils';

export const TimesheetsForm: React.FC<TimesheetsFormProps> = ({
  initialValues,
  onClose,
  mode,
  onSubmit,
  userRole,
  userOptions, // users to offer in the User <Select> - only for admin
  userInfo,
  allCarsOnProjectData, // unfiltered query response - json of projectusers list and their cars/statement data
  carOptionsForLoggedInUser, // list of cars for logged in user either crew/admin
}) => {
  // const [selectedCar, setSelectedCar] = useState<string | null>(
  //   initialValues?.carId || null,
  // );
  const [selectedCar, setSelectedCar] = useState<string | null>(null);

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isCarVisible, setIsCarVisible] = useState(false);

  const defaultValues: TimesheetFormValues = {
    ...initialValues,
    start_date: toLocalISOString(new Date()).split('T')[0],
    end_date: toLocalISOString(new Date()).split('T')[0],
    shift_lenght: 10,
    from: '',
    to: '',
    calculated_overtime: 0,
    claimed_overtime: 0,
    projectUser: {
      id: userInfo?.id || '',
      name: userInfo?.name || '',
      surname: userInfo?.surname || '',
    },
    // carId: initialValues?.carId || '',
    carId: '',
    kilometers: 0,
  };

  const mergedValues = {
    ...defaultValues,
    ...initialValues,
    from: initialValues?.from
      ? formatTime(initialValues.from)
      : defaultValues.from,
    to: initialValues?.to ? formatTime(initialValues.to) : defaultValues.to,
    projectUser: {
      id: initialValues?.projectUser?.id || defaultValues.projectUser.id,
      name: initialValues?.projectUser?.name || defaultValues.projectUser.name,
      surname:
        initialValues?.projectUser?.surname ||
        defaultValues.projectUser.surname,
    },
    // carId:
    //   // 22IQ solution - will cry if debugging needed
    //   (initialValues?.carId ||
    //     (initialValues?.userCars && initialValues.userCars.length > 0
    //       ? initialValues.userCars[0].id
    //       : '')) ??
    //   '',
    carId: selectedCar || undefined,
  };

  console.log(initialValues?.carId, 'caridINIT');
  console.log(defaultValues?.carId, 'caridDEFAULT');
  console.log(mergedValues?.carId, 'caridMERGED');
  console.log(carOptionsForLoggedInUser, 'c');

  const { handleSubmit, control, setValue } = useForm<TimesheetFormValues>({
    defaultValues: mergedValues,
  });

  const from = useWatch({ control, name: 'from' });
  const to = useWatch({ control, name: 'to' });
  const shift = useWatch({ control, name: 'shift_lenght' });

  useEffect(() => {
    if (from && to && shift) {
      const fromTime = new Date(`1970-01-01T${from}:00`);
      let toTime = new Date(`1970-01-01T${to}:00`);
      if (toTime < fromTime) {
        toTime.setDate(toTime.getDate() + 1);
      }

      const workedHours =
        (toTime.getTime() - fromTime.getTime()) / (1000 * 60 * 60);

      if (workedHours > shift) {
        const overtime = Math.ceil(workedHours - shift);
        setValue('calculated_overtime', overtime);
        if (!initialValues?.claimed_overtime) {
          setValue('claimed_overtime', overtime);
        }
      } else {
        setValue('calculated_overtime', 0);
        if (!initialValues?.claimed_overtime) {
          setValue('claimed_overtime', 0);
        }
      }
    }
  }, [from, to, shift, setValue, initialValues]);

  useEffect(() => {
    if (userInfo?.id) {
      setSelectedUser(userInfo.id);
    }
  }, [userInfo, setSelectedUser]);

  useEffect(() => {
    if (initialValues?.carId) {
      setSelectedCar(initialValues.carId);
    }
  }, [initialValues]);

  // console.log(mergedValues,' MERGED VALUES')
  // console.log(initialValues?.userCars, 'USERCARSINITIALVALUE')
  // console.log(initialValues, 'init');
  // console.log(carOptionsForLoggedInUser, 'caroptionsforloggedin');

  // console.log(allCarsOnProjectData);
  // console.log(selectedUser);
  // console.log(
  //   getAvailableCarsForProjectUserId(selectedUser, allCarsOnProjectData),
  //   'fce',
  // );

  const getAvailableCars = () => {
    if (userRole === 'ADMIN' && mode === 'add') {
      return getAvailableCarsForProjectUserId(
        selectedUser || '',
        allCarsOnProjectData,
      );
    } else if (userRole === 'CREW' && mode === 'add') {
      return getAvailableCarsForProjectUserId(
        selectedUser || '',
        allCarsOnProjectData,
      );
    } else {
      return getAvailableCarsForProjectUserId(
        initialValues?.projectUser.id || '',
        allCarsOnProjectData,
      );
    }
  };

  useEffect(() => {
    const availableCars = getAvailableCars();
    if (availableCars.length > 0) {
      const initialCarId = initialValues?.carId || availableCars[0].id;
      setSelectedCar(initialCarId);
      setValue('carId', initialCarId);
    }

    if (mode === 'edit') {
      setIsCarVisible(true);
    }
  }, [initialValues, allCarsOnProjectData, setSelectedCar, setValue, mode]);

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Box>
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
                      const selectedUserId = e.target.value;
                      setSelectedUser(selectedUserId);
                      field.onChange(selectedUserId);
                      setIsCarVisible(false);
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
          <FormControl display="flex" alignItems="center" mb={4}>
            {mode === 'add' &&
              ((carOptionsForLoggedInUser && userRole === 'CREW') ||
                getAvailableCarsForProjectUserId(
                  initialValues?.projectUser.id || '', // statement users id
                  allCarsOnProjectData,
                ).length > 0 ||
                (mode === 'add' &&
                  getAvailableCarsForProjectUserId(
                    selectedUser || '',
                    allCarsOnProjectData,
                  ).length > 0 && (
                    <>
                      <FormLabel htmlFor="car-switch" mb="0">
                        Add Mileage
                      </FormLabel>
                      <Switch
                        id="car-switch"
                        isChecked={isCarVisible}
                        onChange={() => {
                          setIsCarVisible(!isCarVisible);
                          if (!isCarVisible) {
                            const availableCars = getAvailableCars();
                            if (availableCars.length > 0) {
                              const initialCarId = availableCars[0].id;
                              setSelectedCar(initialCarId);
                              setValue('carId', initialCarId);
                            }
                          }
                        }}
                      />
                    </>
                  )))}
          </FormControl>
          {/* my favorite game is crying */}
          {isCarVisible &&
            ((carOptionsForLoggedInUser && userRole === 'CREW') ||
              getAvailableCarsForProjectUserId(
                initialValues?.projectUser.id || '', // statement users id
                allCarsOnProjectData,
              ).length > 0 ||
              (mode === 'add' &&
                getAvailableCarsForProjectUserId(
                  selectedUser || '',
                  allCarsOnProjectData,
                ).length > 0)) && (
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
                          field.onChange(e.target.value);
                          setSelectedCar(e.target.value);
                        }}
                        value={field.value || ''}
                      >
                        {getAvailableCars().map((car) => (
                          <option key={car.id} value={car.id}>
                            {car.name}
                          </option>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Kilometers</FormLabel>
                  <Controller
                    name="kilometers"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                        value={field.value}
                      />
                    )}
                  />
                </FormControl>
              </>
            )}
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Text textAlign="center">insert info about $$$ etc here</Text>
        </Box>
      </SimpleGrid>
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
