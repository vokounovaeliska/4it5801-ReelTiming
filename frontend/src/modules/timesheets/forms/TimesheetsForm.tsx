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

import { currencyUtil } from '@shared/currencyUtil';
import { statementUtil } from '@shared/statementUtil';

import {
  Car,
  TimesheetFormValues,
  TimesheetProjectUsers,
  TimesheetsFormProps,
} from '../interfaces';
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
  userInfoRates,
  projectCurrency,
}) => {
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [selectedCarDetails, setSelectedCarDetails] = useState<Car | null>(
    null,
  );
  const [workedHours, setWorkedHours] = useState(0);
  const [, setClaimedKilometers] = useState(0);
  const [claimedOvertime, setClaimedOvertime] = useState(
    initialValues?.claimed_overtime || 0,
  );
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isCarVisible, setIsCarVisible] = useState(false);
  const [userRates, setUserRates] = useState<
    TimesheetProjectUsers['rate'] | null
  >(null);
  const [carRates, setCarRates] = useState<TimesheetProjectUsers['car'] | null>(
    null,
  );

  // const userInfoRatesData: TimesheetProjectUsers = {
  //   id: userInfoRates?.id || '',
  //   name: userInfoRates?.name || '',
  //   surname: userInfoRates?.surname || '',
  //   car: {
  //     id: userInfoRates?.car?.id || '',
  //     name: userInfoRates?.car?.name || '',
  //     kilometer_allow: userInfoRates?.car?.kilometer_allow || 0,
  //     kilometer_rate: userInfoRates?.car?.kilometer_rate || 0,
  //   },
  //   rate: {
  //     compensation_rate: userInfoRates?.rate?.compensation_rate || 0,
  //     standard_rate: userInfoRates?.rate?.standard_rate || 0,
  //     overtime_hour1: userInfoRates?.rate?.overtime_hour1 || 0,
  //     overtime_hour2: userInfoRates?.rate?.overtime_hour2 || 0,
  //     overtime_hour3: userInfoRates?.rate?.overtime_hour3 || 0,
  //     overtime_hour4: userInfoRates?.rate?.overtime_hour4 || 0,
  //   },
  // };

  const defaultValues: TimesheetFormValues = {
    ...initialValues,
    start_date: toLocalISOString(new Date()).split('T')[0],
    end_date: toLocalISOString(new Date()).split('T')[0],
    shift_lenght: 12,
    from: '',
    to: '',
    calculated_overtime: 0,
    claimed_overtime: 0,
    projectUser: {
      id: userInfo?.id || '',
      name: userInfo?.name || '',
      surname: userInfo?.surname || '',
    },
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
    carId: selectedCar || undefined,
  };

  const { handleSubmit, control, setValue } = useForm<TimesheetFormValues>({
    defaultValues: mergedValues,
  });

  const from = useWatch({ control, name: 'from' });
  const to = useWatch({ control, name: 'to' });
  const shift = useWatch({ control, name: 'shift_lenght' });
  const kilometers = useWatch({ control, name: 'kilometers' });

  useEffect(() => {
    if (from && to && shift) {
      const fromTime = new Date(`1970-01-01T${from}:00`);
      let toTime = new Date(`1970-01-01T${to}:00`);
      if (toTime < fromTime) {
        toTime.setDate(toTime.getDate() + 1);
      }

      const workedHours = Math.ceil(
        (toTime.getTime() - fromTime.getTime()) / (1000 * 60 * 60),
      );

      setWorkedHours(workedHours);
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

  useEffect(() => {
    if (selectedCar) {
      const car = getAvailableCars().find((car) => car.id === selectedCar);
      setSelectedCarDetails(car || null);
    } else setSelectedCarDetails(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCar]);

  const claimedOvertimeValue = useWatch({
    control,
    name: 'claimed_overtime',
  });

  useEffect(() => {
    setClaimedOvertime(claimedOvertimeValue || 0);
  }, [claimedOvertimeValue]);

  const getAvailableCars = () => {
    if (userRole === 'ADMIN' && mode === 'add') {
      return getAvailableCarsForProjectUserId(
        selectedUser || '',
        allCarsOnProjectData,
      );
    } else if (userRole === 'CREW' && mode === 'add') {
      return getAvailableCarsForProjectUserId(
        selectedUser ?? mergedValues.projectUser?.id ?? '',
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
      const initialCarId = initialValues?.carId ?? initialValues?.car?.id ?? '';
      setSelectedCar(initialCarId);
      setValue('carId', initialCarId);
    }

    if (mode === 'edit') {
      setIsCarVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, allCarsOnProjectData, setSelectedCar, setValue, mode]);

  const calculateOvertimePay = (claimedOvertime: number) => {
    const { overtime_hour1, overtime_hour2, overtime_hour3, overtime_hour4 } =
      userRates || {};
    let totalOvertimePay = 0;

    for (let i = 1; i <= claimedOvertime; i++) {
      if (i === 1) {
        totalOvertimePay += overtime_hour1 || 0;
      } else if (i === 2) {
        totalOvertimePay += overtime_hour2 || 0;
      } else if (i === 3) {
        totalOvertimePay += overtime_hour3 || 0;
      } else {
        totalOvertimePay += overtime_hour4 || 0;
      }
    }

    return totalOvertimePay;
  };

  const calculateExcessKilometers = (claimedKilometers: number) => {
    const kilometerAllow =
      carRates?.kilometer_allow ?? selectedCarDetails?.kilometer_allow ?? 0;
    return claimedKilometers > kilometerAllow
      ? claimedKilometers - kilometerAllow
      : 0;
  };

  useEffect(() => {
    if (selectedUser) {
      const user = Array.isArray(userInfoRates?.projectUsers)
        ? userInfoRates.projectUsers.find((user) => user.id === selectedUser)
        : null;
      if (user) {
        setUserRates(user.rate);
        if (Array.isArray(user.car) && user.car.length > 0) {
          const selectedCarInfo = user.car.find(
            (car) => car.id === selectedCar,
          );
          setCarRates(selectedCarInfo || null);
        } else {
          setCarRates(null);
        }
      }
    }
  }, [selectedUser, selectedCar, userInfoRates]);

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
                  ).length > 0)) && (
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
                    colorScheme="orange"
                  />
                </>
              )}
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
                        <option value="">-</option>
                        {getAvailableCars().map((car) => (
                          <option key={car.id} value={car.id}>
                            {car.name}
                          </option>
                        ))}
                      </Select>
                    )}
                  />
                  {selectedCarDetails && (
                    <Text color="gray.500">
                      kilometers allow:{' '}
                      {selectedCarDetails?.kilometer_allow ?? '-'} km,
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
                  <FormLabel mt={2}>Kilometers</FormLabel>
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
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontWeight="bold" textAlign="center">
            User
          </Text>
          <Box pl={4} textAlign="left">
            <Text textAlign="center">
              Standard pay:{' '}
              {mode === 'add' &&
                currencyUtil.formatAmount(
                  userRates?.standard_rate
                    ? userRates.standard_rate * Math.min(workedHours, shift)
                    : 0,
                  projectCurrency,
                )}
              {mode === 'edit' &&
                currencyUtil.formatAmount(
                  initialValues?.projectUser?.rate?.standard_rate
                    ? initialValues?.projectUser?.rate?.standard_rate *
                        Math.min(workedHours, shift)
                    : 0,
                  projectCurrency,
                  2,
                )}
            </Text>
            <Text textAlign="center">
              Overtime pay:{' '}
              {mode === 'add' &&
                currencyUtil.formatAmount(
                  calculateOvertimePay(claimedOvertime),
                  projectCurrency,
                )}
              {mode === 'edit' &&
                currencyUtil.formatAmount(
                  statementUtil.calculateOvertimeAmount({
                    claimed_overtime: claimedOvertime ?? 0,
                    projectUser: {
                      rate: initialValues?.projectUser?.rate,
                    },
                  }),
                  projectCurrency,
                  2,
                )}
            </Text>
            <Text textAlign="center">
              Total:{' '}
              {mode === 'add' &&
                currencyUtil.formatAmount(
                  (userRates?.standard_rate
                    ? userRates.standard_rate * Math.min(workedHours, shift)
                    : 0) + calculateOvertimePay(claimedOvertime),
                  projectCurrency,
                )}
              {mode === 'edit' &&
                currencyUtil.formatAmount(
                  (initialValues?.projectUser?.rate?.standard_rate
                    ? initialValues?.projectUser?.rate?.standard_rate *
                      Math.min(workedHours, shift)
                    : 0) +
                    statementUtil.calculateOvertimeAmount({
                      claimed_overtime: claimedOvertime ?? 0,
                      projectUser: {
                        rate: initialValues?.projectUser?.rate,
                      },
                    }),
                  projectCurrency,
                  2,
                )}
            </Text>
          </Box>
          {(selectedCar && isCarVisible && mode === 'add') ||
          (mode === 'edit' && selectedCar) ? (
            <>
              <Text fontWeight="bold" textAlign="center" mt={4}>
                Mileage
              </Text>
              <Box pl={4} textAlign="left">
                <Text textAlign="center">
                  Mileage above allowance:{' '}
                  {calculateExcessKilometers(kilometers ?? 0) + ' km'}
                </Text>
                <Text textAlign="center">
                  Mileage above allowance cost:{' '}
                  {currencyUtil.formatAmount(
                    calculateExcessKilometers(kilometers ?? 0) *
                      (carRates?.kilometer_rate ??
                        selectedCarDetails?.kilometer_rate ??
                        0),
                    projectCurrency,
                  )}
                </Text>
              </Box>
            </>
          ) : null}
          <Text textAlign="center" mt={5} fontWeight={'bold'}>
            Total cost:{' '}
            {mode === 'add' &&
              currencyUtil.formatAmount(
                (userRates?.standard_rate
                  ? userRates.standard_rate * Math.min(workedHours, shift)
                  : 0) +
                  calculateOvertimePay(claimedOvertime) +
                  calculateExcessKilometers(kilometers ?? 0) *
                    (carRates?.kilometer_rate ??
                      selectedCarDetails?.kilometer_rate ??
                      0),
                projectCurrency,
              )}
            {mode === 'edit' &&
              currencyUtil.formatAmount(
                (initialValues?.projectUser?.rate?.standard_rate
                  ? initialValues?.projectUser?.rate?.standard_rate *
                    Math.min(workedHours, shift)
                  : 0) +
                  statementUtil.calculateOvertimeAmount({
                    claimed_overtime: claimedOvertime ?? 0,
                    projectUser: {
                      rate: initialValues?.projectUser?.rate,
                    },
                  }) +
                  calculateExcessKilometers(kilometers ?? 0) *
                    (carRates?.kilometer_rate ??
                      selectedCarDetails?.kilometer_rate ??
                      0),
                projectCurrency,
                2,
              )}
          </Text>
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
