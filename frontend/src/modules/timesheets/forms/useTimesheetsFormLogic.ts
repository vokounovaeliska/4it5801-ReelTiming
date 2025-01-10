import { useEffect, useState } from 'react';
import {
  AllCarsOnProjectData,
  Car,
  Rate,
  TimesheetFormValues,
  TimesheetProjectUsers,
} from '../interfaces';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';

export const useTimesheetsFormLogic = (
  from: string,
  to: string,
  shift: number,
  setValue: UseFormSetValue<TimesheetFormValues>,
  initialValues: TimesheetFormValues | undefined,
) => {
  const [workedHours, setWorkedHours] = useState(0);

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

  return workedHours;
};

export const useSelectedUser = (
  selectedUser: string | null,
  selectedCar: string | null,
  userInfoRates: TimesheetProjectUsers,
) => {
  const [userRates, setUserRates] = useState<Rate | null>(null);
  const [carRates, setCarRates] = useState<Car | null>(null);
  useEffect(() => {
    if (selectedUser) {
      const user = Object.values(userInfoRates).find(
        (user) => user.id === selectedUser,
      );
      if (user) {
        setUserRates(user.rate || null);
        const selectedCarInfo =
          user.car?.find((car: Car) => car.id === selectedCar) || null;
        setCarRates(selectedCarInfo);
      } else {
        setUserRates(null);
        setCarRates(null);
      }
    } else {
      setUserRates(null);
      setCarRates(null);
    }
  }, [selectedUser, selectedCar, userInfoRates]);

  return { userRates, carRates };
};

export const useAvailableCars = (
  userRole: string,
  mode: string,
  selectedUser: string | null,
  mergedValues: TimesheetFormValues,
  initialValues: TimesheetFormValues | undefined,
  allCarsOnProjectData: AllCarsOnProjectData,
  setSelectedCar: (carId: string | null) => void,
  setValue: UseFormSetValue<TimesheetFormValues>,
) => {
  const [availableCars, setAvailableCars] = useState<Car[]>([]);

  useEffect(() => {
    if (!selectedUser) return;

    let cars: Car[] = [];
    if (userRole === 'ADMIN' && mode === 'add') {
      cars = getAvailableCarsForProjectUserId(
        selectedUser || '',
        allCarsOnProjectData,
      );
    } else if (userRole === 'CREW' && mode === 'add') {
      cars = getAvailableCarsForProjectUserId(
        selectedUser ?? mergedValues.projectUser?.id ?? '',
        allCarsOnProjectData,
      );
    } else {
      cars = getAvailableCarsForProjectUserId(
        initialValues?.projectUser.id || '',
        allCarsOnProjectData,
      );
    }
    setAvailableCars(cars);
  }, [
    userRole,
    mode,
    selectedUser,
    mergedValues.projectUser?.id,
    allCarsOnProjectData,
    initialValues?.projectUser.id,
  ]);

  useEffect(() => {
    if (availableCars.length > 0) {
      const initialCarId = initialValues?.carId ?? initialValues?.car?.id ?? '';
      setSelectedCar(initialCarId);
      setValue('carId', initialCarId);
    }
  }, [
    initialValues,
    allCarsOnProjectData,
    setSelectedCar,
    setValue,
    mode,
    availableCars.length,
  ]);

  return availableCars;
};

const getAvailableCarsForProjectUserId = (
  givenUser: string,
  allCarsOnProjectData: AllCarsOnProjectData,
): Car[] => {
  if (
    !givenUser ||
    !allCarsOnProjectData?.projectUsers ||
    !Array.isArray(allCarsOnProjectData.projectUsers)
  ) {
    return [];
  }

  const filteredCarsOnProject = allCarsOnProjectData.projectUsers.filter(
    (projectUser) => projectUser.id === givenUser,
  );

  const carDetails = filteredCarsOnProject.flatMap(
    (projectUser) =>
      projectUser.car?.map((car) => ({
        id: car.id,
        name: car.name,
        kilometer_allow: car.kilometer_allow,
        kilometer_rate: car.kilometer_rate,
      })) || [],
  );

  return carDetails;
};

export const useUserInfoEffect = (
  userInfo: { id: string } | null,
  setSelectedUser: (userId: string | null) => void,
) => {
  useEffect(() => {
    if (userInfo?.id) {
      setSelectedUser(userInfo.id);
    }
  }, [userInfo, setSelectedUser]);
};

export const useInitialCarEffect = (
  initialValues: TimesheetFormValues | undefined,
  setSelectedCar: (carId: string | null) => void,
) => {
  useEffect(() => {
    if (initialValues?.carId) {
      setSelectedCar(initialValues.carId);
    }
  }, [initialValues, setSelectedCar]);
};

export const useSelectedCarEffect = (
  availableCars: Car[],
  selectedCar: string | null,
  setSelectedCarDetails: (car: Car | null) => void,
) => {
  useEffect(() => {
    if (selectedCar) {
      const car = availableCars.find((car) => car.id === selectedCar);
      setSelectedCarDetails(car ?? null);
    } else {
      setSelectedCarDetails(null);
    }
  }, [availableCars, selectedCar, setSelectedCarDetails]);
};

export const useClaimedOvertimeEffect = (
  control: Control<TimesheetFormValues>,
  setClaimedOvertime: (overtime: number) => void,
) => {
  const claimedOvertimeValue = useWatch({
    control,
    name: 'claimed_overtime',
  });

  useEffect(() => {
    setClaimedOvertime(claimedOvertimeValue || 0);
  }, [claimedOvertimeValue, setClaimedOvertime]);
};
