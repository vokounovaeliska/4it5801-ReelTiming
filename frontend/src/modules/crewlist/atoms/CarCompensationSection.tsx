import React from 'react';
import { Box } from '@chakra-ui/react';

import { Car, CarStatement } from '@frontend/modules/timesheets/interfaces';
import { FormSection } from '@frontend/shared/forms/molecules/FormSection';
import { CarFormWithTable } from '@frontend/shared/forms/VehicleFulfillmentForm';

interface CarCompensationSectionProps {
  cars: Car[] | null;
  onCarCollectionChange: (cars: Car[]) => void;
  projectCurrency: string;
  carStatements: CarStatement[];
}

export const CarCompensationSection: React.FC<CarCompensationSectionProps> = ({
  cars,
  onCarCollectionChange,
  projectCurrency,
  carStatements,
}) => {
  return (
    <FormSection
      title="Car Compensation"
      description="Details about car usage and related compensation rates."
      fontSize="1.7rem"
    >
      <Box position="relative" padding="2">
        <Box p="4">
          <CarFormWithTable
            onCarCollectionChange={onCarCollectionChange}
            cars={cars}
            carStatements={carStatements}
            projectCurrency={projectCurrency}
          />
        </Box>
      </Box>
    </FormSection>
  );
};
