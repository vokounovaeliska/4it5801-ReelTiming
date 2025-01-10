import React, { useRef, useState } from 'react';
import { Box, Text, useDisclosure } from '@chakra-ui/react';
import { addDays, format, max, parseISO } from 'date-fns';

import { ShootingDay } from '@frontend/gql/graphql';
import {
  showErrorToast,
  showSuccessToast,
} from '@frontend/shared/design-system/molecules/toastUtils';

import { DeleteConfirmationDialog } from '../atoms/ShootingDaysDialog';

import { ShootingDaysInputForm } from './ShootingDaysInputForm';
import { ShootingDaysTable } from './ShootingDaysTable';

interface ShootingDaysConfigFormProps {
  shootingDays: ShootingDay[];
  handleShootingDaysChange: (cars: ShootingDay[]) => void;
}

export const ShootingDaysConfigForm: React.FC<ShootingDaysConfigFormProps> = ({
  shootingDays,
  handleShootingDaysChange,
}) => {
  const setNewDate = (days: ShootingDay[]): string => {
    const maximumDate = max(days.map((day) => day.date));
    return format(addDays(maximumDate, 1), 'yyyy-MM-dd');
  };

  const setNewShootingDayNumber = (days: ShootingDay[]): number => {
    return Math.max(...days.map((day) => day.shooting_day_number)) + 1;
  };

  const setNewShootingDay = (days: ShootingDay[]) => {
    setShootingDay({
      id: '',
      shooting_day_number: setNewShootingDayNumber(days),
      date: setNewDate(days),
    });
  };

  const [shootingDay, setShootingDay] = useState<ShootingDay>({
    id: '',
    shooting_day_number:
      shootingDays !== undefined ? setNewShootingDayNumber(shootingDays) : 1,
    date: setNewDate(shootingDays),
  });

  const [shootingDaysCollection, setShootingDaysCollection] =
    useState(shootingDays);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const cancelRef = useRef(null);
  const [shootingDayToDeleteIndex, setShootingDayToDeleteIndex] = useState<
    number | null
  >(null);

  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose,
  } = useDisclosure();

  const handleAddOrUpdateShootingDay = () => {
    if (!shootingDay.shooting_day_number || !shootingDay.date) {
      showErrorToast('Please fill in all fields before submitting.');
      return;
    }

    const isDuplicateDayNumber = shootingDaysCollection.some(
      (day) =>
        day.shooting_day_number === shootingDay.shooting_day_number &&
        (!isEditing || day.id !== shootingDay.id),
    );

    const isDuplicateDayDate = shootingDaysCollection.some(
      (day) =>
        day.date === shootingDay.date &&
        (!isEditing || day.id !== shootingDay.id),
    );

    if (isDuplicateDayNumber) {
      showErrorToast(
        'A day with this number already exists. Please use a unique day number.',
      );
      return;
    }

    if (isDuplicateDayDate) {
      showErrorToast(
        'A shooting day with this date already exists. Please use a unique date.',
      );
      return;
    }

    let updatedDaysCollection;

    if (isEditing) {
      updatedDaysCollection = shootingDaysCollection.map((day) =>
        day.id === shootingDay.id
          ? {
              ...day,
              shooting_day_number: shootingDay.shooting_day_number,
              date: shootingDay.date,
            }
          : day,
      );
      setIsEditing(false);
      showSuccessToast(
        `Day ${shootingDay.shooting_day_number} has been updated.`,
      );
    } else {
      const newShootingDay: ShootingDay = {
        id: Date.now().toString(),
        shooting_day_number: shootingDay.shooting_day_number,
        date: shootingDay.date,
      };
      updatedDaysCollection = [...shootingDaysCollection, newShootingDay];
      showSuccessToast(
        `Day ${shootingDay.shooting_day_number} has been added.`,
      );
    }

    updatedDaysCollection = updatedDaysCollection.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    setShootingDaysCollection(updatedDaysCollection);

    handleShootingDaysChange(updatedDaysCollection);

    setNewShootingDay(updatedDaysCollection);
  };

  const handleEditShootingDay = (index: number) => {
    const dayToEdit = shootingDaysCollection[index];
    if (dayToEdit) {
      setShootingDay({
        ...dayToEdit,
        date: format(parseISO(dayToEdit.date), 'yyyy-MM-dd'),
      });
      setIsEditing(true);
    }
  };

  const handleDeleteShootingDay = (indexToRemove: number) => {
    setShootingDaysCollection((prev) => {
      const updatedCollection = prev.filter(
        (_, index) => index !== indexToRemove,
      );

      handleShootingDaysChange(updatedCollection);

      setNewShootingDay(updatedCollection);

      return updatedCollection;
    });

    showSuccessToast('The shooting day has been removed.');
  };

  return (
    <Box flex="1" p={4}>
      <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
        Shooting Days
      </Text>

      <ShootingDaysInputForm
        shootingDay={shootingDay}
        setShootingDay={setShootingDay}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleAddOrUpdateShootingDay={handleAddOrUpdateShootingDay}
        shootingDays={shootingDaysCollection}
        setNewShootingDay={setNewShootingDay}
      />

      {shootingDaysCollection.length > 0 && (
        <>
          <ShootingDaysTable
            shootingDaysCollection={shootingDaysCollection}
            handleEditShootingDay={handleEditShootingDay}
            handleDeleteShootingDay={(index) => {
              setShootingDayToDeleteIndex(index);
              onDeleteAlertOpen();
            }}
          />
          <DeleteConfirmationDialog
            isOpen={isDeleteAlertOpen}
            onClose={onDeleteAlertClose}
            cancelRef={cancelRef}
            handleRemoveShootingDay={() => {
              if (shootingDayToDeleteIndex !== null) {
                handleDeleteShootingDay(shootingDayToDeleteIndex);
              }
              onDeleteAlertClose();
            }}
          />
        </>
      )}
    </Box>
  );
};
