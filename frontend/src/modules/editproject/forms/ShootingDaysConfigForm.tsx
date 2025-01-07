import React, { useRef, useState } from 'react';
import { Box, Text, useDisclosure } from '@chakra-ui/react';

import {
  showErrorToast,
  showSuccessToast,
} from '@frontend/shared/design-system/molecules/toastUtils';

import { DeleteConfirmationDialog } from '../atoms/ShootingDaysDialog';

import { ShootingDaysInputForm } from './ShootingDaysInputForm';
import { ShootingDaysTable } from './ShootingDaysTable';

type ShootingDay = {
  id: string;
  dayNumber: number;
  shootingDayDate: string;
};

interface ShootingDaysConfigFormProps {
  shootingDays: ShootingDay[];
}

export const ShootingDaysConfigForm: React.FC<ShootingDaysConfigFormProps> = ({
  shootingDays,
}) => {
  const [shootingDay, setShootingDay] = useState<ShootingDay>({
    id: '',
    dayNumber: shootingDays !== undefined ? shootingDays.length : 1,
    shootingDayDate: '',
  });
  const [shootingDaysCollection, setShootingDaysCollection] = useState<
    ShootingDay[]
  >(shootingDays || []);
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
    if (!shootingDay.dayNumber || !shootingDay.shootingDayDate) {
      showErrorToast('Please fill in all fields before submitting.');
      return;
    }

    // Check for duplicate dayNumber
    const isDuplicateDayNumber = shootingDaysCollection.some(
      (day) =>
        day.dayNumber === shootingDay.dayNumber &&
        (!isEditing || day.id !== shootingDay.id),
    );

    // Check for duplicate shootingDayDate
    const isDuplicateDayDate = shootingDaysCollection.some(
      (day) =>
        day.shootingDayDate === shootingDay.shootingDayDate &&
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

    if (isEditing) {
      setShootingDaysCollection((prev) =>
        prev.map((day) =>
          day.id === shootingDay.id
            ? {
                ...day,
                dayNumber: shootingDay.dayNumber,
                shootingDayDate: shootingDay.shootingDayDate,
              }
            : day,
        ),
      );
      showSuccessToast(`Day ${shootingDay.dayNumber} has been updated.`);
      setIsEditing(false);
    } else {
      const newShootingDay: ShootingDay = {
        id: Date.now().toString(),
        dayNumber: shootingDay.dayNumber,
        shootingDayDate: shootingDay.shootingDayDate,
      };
      setShootingDaysCollection((prev) => [...prev, newShootingDay]);
      showSuccessToast(`Day ${shootingDay.dayNumber} has been added.`);
    }

    setShootingDay({
      id: '',
      dayNumber:
        shootingDaysCollection !== undefined
          ? shootingDaysCollection.length + 2
          : 1,
      shootingDayDate: '',
    });
  };

  const handleEditShootingDay = (index: number) => {
    const dayToEdit = shootingDaysCollection[index];
    if (dayToEdit) {
      setShootingDay(dayToEdit);
      setIsEditing(true);
    }
  };

  const handleDeleteShootingDay = (indexToRemove: number) => {
    setShootingDaysCollection((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
    setShootingDay({
      id: '',
      dayNumber:
        shootingDaysCollection !== undefined
          ? shootingDaysCollection.length
          : 1,
      shootingDayDate: '',
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
        shootingDaysLenght={shootingDaysCollection.length}
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
