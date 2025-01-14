import React, { useRef, useState } from 'react';
import { Box, Text, useDisclosure } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

import { ShootingDay } from '@frontend/gql/graphql';
import {
  showErrorToast,
  showSuccessToast,
} from '@frontend/shared/design-system/molecules/toastUtils';

import { DeleteConfirmationDialog } from '../atoms/ShootingDaysDialog';
import { ProjectData } from '../pages/EditProjectPage';
import {
  calculateNewDate,
  calculateNewDayNumber,
  isDateWithinProjectDays,
  validateShootingDay,
} from '../util/shootingDaysUtil';

import { ShootingDaysInputForm } from './ShootingDaysInputForm';
import { ShootingDaysTable } from './ShootingDaysTable';

interface ShootingDaysConfigFormProps {
  shootingDays: ShootingDay[];
  handleShootingDaysChange: (cars: ShootingDay[]) => void;
  projectData: ProjectData;
}

export const ShootingDaysConfigForm = ({
  shootingDays,
  handleShootingDaysChange,
  projectData,
}: ShootingDaysConfigFormProps) => {
  const setNewShootingDay = (days: ShootingDay[]) => {
    setShootingDay({
      id: '',
      shooting_day_number: calculateNewDayNumber(days),
      date: calculateNewDate(days, projectData.start_date),
    });
  };

  const [shootingDay, setShootingDay] = useState<ShootingDay>({
    id: '',
    shooting_day_number: calculateNewDayNumber(shootingDays),
    date: calculateNewDate(shootingDays, projectData.start_date),
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

    const { valid, message } = validateShootingDay(
      shootingDay,
      shootingDaysCollection,
      isEditing,
    );

    if (!valid) {
      showErrorToast(message);
      return;
    }

    if (!isDateWithinProjectDays(shootingDay, projectData)) {
      showErrorToast('Shooting day date is after the project deadline!');
      return;
    }

    let updatedDaysCollection;

    if (isEditing) {
      updatedDaysCollection = shootingDaysCollection.map((day) =>
        day.id === shootingDay.id ? { ...day, ...shootingDay } : day,
      );
      setIsEditing(false);
      showSuccessToast(`Day ${shootingDay.date} has been updated.`);
    } else {
      const newShootingDay: ShootingDay = {
        id: Date.now().toString(),
        shooting_day_number: shootingDay.shooting_day_number,
        date: shootingDay.date,
      };
      updatedDaysCollection = [...shootingDaysCollection, newShootingDay];
      showSuccessToast(`Day ${shootingDay.date} has been added.`);
    }

    updatedDaysCollection = updatedDaysCollection
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((day, index) => ({ ...day, shooting_day_number: index + 1 }));

    setShootingDaysCollection(updatedDaysCollection);
    handleShootingDaysChange(updatedDaysCollection);
    setNewShootingDay(updatedDaysCollection);
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
            handleEditShootingDay={(index) => {
              const dayToEdit = shootingDaysCollection[index];
              if (dayToEdit) {
                setShootingDay({
                  ...dayToEdit,
                  date: format(parseISO(dayToEdit.date), 'yyyy-MM-dd'),
                });
                setIsEditing(true);
              }
            }}
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
                const updatedCollection = shootingDaysCollection.filter(
                  (_, index) => index !== shootingDayToDeleteIndex,
                );
                setShootingDaysCollection(updatedCollection);
                handleShootingDaysChange(updatedCollection);
                setNewShootingDay(updatedCollection);
                showSuccessToast('The shooting day has been removed.');
              }
              onDeleteAlertClose();
            }}
          />
        </>
      )}
    </Box>
  );
};
