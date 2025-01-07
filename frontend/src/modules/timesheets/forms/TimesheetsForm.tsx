import React, { useState } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { useForm, useWatch } from 'react-hook-form';

import { Car, TimesheetFormValues, TimesheetsFormProps } from '../interfaces';
import { formatTime, toLocalISOString } from '../utils/timeUtils';

import CarSection from './CarSection';
import DateTimeSection from './DateTimeSection';
import FormButtons from './FormButtons';
import OvertimeSection from './OvertimeSection';
import SummarySection from './SummarySection';
import UserSection from './UserSection';
import {
  useAvailableCars,
  useClaimedOvertimeEffect,
  useInitialCarEffect,
  useSelectedCarEffect,
  useSelectedUser,
  useTimesheetsFormLogic,
  useUserInfoEffect,
} from './useTimesheetsFormLogic';

export const TimesheetsForm: React.FC<TimesheetsFormProps> = ({
  initialValues,
  onClose,
  mode,
  onSubmit,
  userRole,
  userOptions,
  userInfo,
  allCarsOnProjectData,
  carOptionsForLoggedInUser,
  userInfoRates,
  projectCurrency,
}) => {
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [selectedCarDetails, setSelectedCarDetails] = useState<Car | null>(
    null,
  );
  const [, setClaimedKilometers] = useState(0);
  const [claimedOvertime, setClaimedOvertime] = useState(
    initialValues?.claimed_overtime || 0,
  );
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isCarVisible, setIsCarVisible] = useState(false);

  const defaultValues = {
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

  const mergedInitialValues = initialValues || defaultValues;

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

  const availableCars = useAvailableCars(
    userRole,
    mode,
    selectedUser,
    mergedValues,
    initialValues,
    allCarsOnProjectData,
    setSelectedCar,
    setValue,
  );

  useUserInfoEffect(userInfo, setSelectedUser);
  useInitialCarEffect(initialValues, setSelectedCar);
  useSelectedCarEffect(availableCars, selectedCar, setSelectedCarDetails);
  useClaimedOvertimeEffect(control, setClaimedOvertime);

  const { userRates, carRates } = useSelectedUser(
    selectedUser,
    selectedCar,
    userInfoRates,
  );

  console.log(selectedUser);
  console.log(userInfo);
  console.log('initialValues');

  console.log(initialValues);

  console.log(userInfoRates);

  const workedHours = useTimesheetsFormLogic(
    from,
    to,
    shift,
    setValue,
    initialValues,
  );

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Box>
          <UserSection
            userRole={userRole}
            mode={mode}
            control={control}
            userOptions={userOptions}
            setSelectedUser={setSelectedUser}
            setIsCarVisible={setIsCarVisible}
          />
          <DateTimeSection
            control={control}
            shift={shift}
            workedHours={workedHours}
          />
          <OvertimeSection control={control} />
          <CarSection
            userRole={userRole}
            mode={mode}
            control={control}
            isCarVisible={isCarVisible}
            setIsCarVisible={setIsCarVisible}
            selectedCar={selectedCar}
            setSelectedCar={(carId) => {
              setSelectedCar(carId);
              if (carId === null) {
                setValue('kilometers', 0);
                setClaimedKilometers(0);
              }
            }}
            selectedCarDetails={selectedCarDetails}
            setSelectedCarDetails={setSelectedCarDetails}
            setClaimedKilometers={setClaimedKilometers}
            getAvailableCars={() => availableCars}
            projectCurrency={projectCurrency}
            carOptionsForLoggedInUser={carOptionsForLoggedInUser}
            setValue={setValue}
          />
        </Box>
        <SummarySection
          mode={mode}
          claimedOvertime={claimedOvertime}
          userRates={userRates}
          initialValues={mergedInitialValues}
          projectCurrency={projectCurrency}
          selectedCar={selectedCar}
          isCarVisible={isCarVisible}
          kilometers={kilometers}
          carRates={carRates}
          selectedCarDetails={selectedCarDetails}
        />
      </SimpleGrid>
      <FormButtons onClose={onClose} onSubmit={handleSubmit(onSubmit)} />
    </Box>
  );
};
