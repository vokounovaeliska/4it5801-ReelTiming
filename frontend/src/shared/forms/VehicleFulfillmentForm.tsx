import React, { useRef, useState } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';

import { Car, CarStatement } from '@frontend/modules/timesheets/interfaces';

import { showErrorToast } from '../design-system/molecules/toastUtils';

import { CarForm } from './CarForm';
import { CarTable } from './CarTable';
import { DeleteConfirmationDialog } from './DeleteCarDialog';

interface CarFormWithTableProps {
  onCarCollectionChange: (cars: Car[]) => void;
  cars: Car[] | null;
  carStatements: CarStatement[];
  projectCurrency: string;
}

export const CarFormWithTable: React.FC<CarFormWithTableProps> = ({
  onCarCollectionChange,
  cars,
  carStatements,
  projectCurrency,
}) => {
  const [carDetails, setCarDetails] = useState<Car>({
    id: '',
    name: '',
    kilometer_allow: 0,
    kilometer_rate: 0,
  });
  const [carCollection, setCarCollection] = useState<Car[]>(cars ? cars : []);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose,
  } = useDisclosure();
  const cancelRef = useRef(null);
  const [carToDeleteIndex, setCarToDeleteIndex] = useState<number | null>(null);

  const handleAddCar = () => {
    if (Number.isNaN(carDetails.kilometer_allow)) {
      carDetails.kilometer_allow = 0;
    }
    if (carDetails.kilometer_allow < 0) {
      showErrorToast('Allowed kilometers can’t be less than 0!');
      return;
    }
    if (carDetails.kilometer_rate <= 0) {
      showErrorToast('Extra km price has to be greater than 0!');
      return;
    }
    if (carDetails.name.trim()) {
      const updatedCarCollection = [
        ...carCollection,
        { ...carDetails, id: `${Date.now()}` },
      ];
      setCarCollection(updatedCarCollection);
      setCarDetails({
        id: '',
        name: '',
        kilometer_allow: 0,
        kilometer_rate: 0,
      });
      onCarCollectionChange(updatedCarCollection);
    } else {
      showErrorToast('Name has to be filled!');
    }
  };

  const handleRemoveCar = (indexToRemove: number) => {
    setCarCollection((prev) => {
      const updatedCarCollection = prev.filter(
        (_, index) => index !== indexToRemove,
      );
      onCarCollectionChange(updatedCarCollection);
      return updatedCarCollection;
    });
  };

  const handleEditCar = (indexToEdit: number) => {
    const carToEdit = carCollection[indexToEdit];
    setCarDetails(carToEdit);
    setIsEditMode(true);
  };

  const handleUpdateCar = () => {
    if (carDetails.name.trim()) {
      const updatedCarCollection = carCollection.map((car) =>
        car.id === carDetails.id ? carDetails : car,
      );
      setCarCollection(updatedCarCollection);
      setCarDetails({
        id: '',
        name: '',
        kilometer_allow: 0,
        kilometer_rate: 0,
      });
      setIsEditMode(false);
      onCarCollectionChange(updatedCarCollection);
    } else {
      showErrorToast('Please fill out all fields before updating a car.');
    }
  };

  const handleCancelEdit = () => {
    setCarDetails({ id: '', name: '', kilometer_allow: 0, kilometer_rate: 0 });
    setIsEditMode(false);
  };

  const isCarDeletable = (carId: string) =>
    !carStatements.some((statement) => statement.car_id === carId);

  return (
    <Box display="block">
      <CarForm
        carDetails={carDetails}
        setCarDetails={setCarDetails}
        handleAddCar={handleAddCar}
        handleUpdateCar={handleUpdateCar}
        handleCancelEdit={handleCancelEdit}
        isEditMode={isEditMode}
      />
      {carCollection.length > 0 && (
        <CarTable
          carCollection={carCollection}
          handleEditCar={handleEditCar}
          isCarDeletable={isCarDeletable}
          onDeleteAlertOpen={onDeleteAlertOpen}
          setCarToDeleteIndex={setCarToDeleteIndex}
          projectCurrency={projectCurrency}
        />
      )}
      <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onClose={onDeleteAlertClose}
        cancelRef={cancelRef}
        handleRemoveCar={() => {
          if (carToDeleteIndex !== null) {
            handleRemoveCar(carToDeleteIndex);
          }
          onDeleteAlertClose();
        }}
      />
    </Box>
  );
};
