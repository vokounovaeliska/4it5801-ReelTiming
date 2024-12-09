import React from 'react';
import { Box, Text } from '@chakra-ui/react';

import { currencyUtil } from '@shared/currencyUtil';

import { SummarySectionProps } from '../interfaces';

const SummarySection: React.FC<SummarySectionProps> = ({
  mode,
  workedHours,
  shift,
  claimedOvertime,
  userRates,
  initialValues,
  projectCurrency,
  selectedCar,
  // isCarVisible,
  kilometers,
  carRates,
  selectedCarDetails,
}) => {
  const calculateTotalOvertimePay = () => {
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

  const calculateStandardPay = () => {
    return mode === 'add'
      ? userRates?.standard_rate
        ? userRates.standard_rate * Math.min(workedHours, shift)
        : 0
      : initialValues?.projectUser?.rate?.standard_rate
        ? initialValues?.projectUser?.rate?.standard_rate *
          Math.min(workedHours, shift)
        : 0;
  };

  const calculateExcessKilometersCost = () => {
    return (
      calculateExcessKilometers(kilometers || 0) *
      (carRates?.kilometer_rate ?? selectedCarDetails?.kilometer_rate ?? 0)
    );
  };

  const calculateTotal = () => {
    return (
      calculateStandardPay() +
      calculateTotalOvertimePay() +
      calculateExcessKilometersCost()
    );
  };

  return (
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
              calculateTotalOvertimePay(),
              projectCurrency,
            )}
          {mode === 'edit' &&
            currencyUtil.formatAmount(
              calculateTotalOvertimePay(),
              projectCurrency,
              2,
            )}
        </Text>
        {selectedCar && (
          <>
            <Text fontWeight="bold" textAlign="center">
              Car
            </Text>
            <Text textAlign="center">
              Excess kilometers: {calculateExcessKilometers(kilometers || 0)} km
            </Text>
            <Text textAlign="center">
              Excess kilometers cost:{' '}
              {currencyUtil.formatAmount(
                calculateExcessKilometers(kilometers || 0) *
                  (carRates?.kilometer_rate ??
                    selectedCarDetails?.kilometer_rate ??
                    0),
                projectCurrency,
              )}
            </Text>
          </>
        )}
        <Text fontWeight="bold" textAlign="center">
          Total
        </Text>
        <Text textAlign="center">
          Total: {currencyUtil.formatAmount(calculateTotal(), projectCurrency)}
        </Text>
      </Box>
    </Box>
  );
};

export default SummarySection;
