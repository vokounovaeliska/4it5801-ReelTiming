import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, HStack, Text } from '@chakra-ui/react';
import { FaCoins } from 'react-icons/fa';

import { GET_ADMIN_STATEMENTS } from '@frontend/graphql/queries/GetStatements';
import { currencyUtil } from '@shared/currencyUtil';

import ShiftsButton from '../atoms/ShiftsButton';
import { Statement } from '../interface';

interface DashboardCostsProps {
  projectId: string;
  currency: string;
}

const DashboardCostsAdmin: React.FC<DashboardCostsProps> = ({
  projectId,
  currency,
}) => {
  const { data, loading, error } = useQuery(GET_ADMIN_STATEMENTS, {
    variables: { projectId },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading data!</Text>;

  const statements: Statement[] = data?.statementsByProjectId || [];

  const totalMileage = statements.reduce(
    (total: number, statement: Statement) => {
      const kilometers = statement.kilometers || 0;
      const car = statement.car;
      if (car && kilometers > (car.kilometer_allow || 0)) {
        const excessKilometers = kilometers - (car.kilometer_allow || 0);
        total += excessKilometers;
      }
      return total;
    },
    0,
  );

  // Calculate total overtime costs
  const totalOvertimeCosts = statements.reduce(
    (total: number, statement: Statement) => {
      const { claimed_overtime } = statement;
      const { overtime_hour1, overtime_hour2, overtime_hour3, overtime_hour4 } =
        statement.projectUser.rate || {
          standard_rate: 0,
          overtime_hour1: 0,
          overtime_hour2: 0,
          overtime_hour3: 0,
          overtime_hour4: 0,
        };

      let overtimeCost = 0;
      if (claimed_overtime! >= 1) {
        overtimeCost += overtime_hour1!;
      }
      if (claimed_overtime! >= 2) {
        overtimeCost += overtime_hour2!;
      }
      if (claimed_overtime! >= 3) {
        overtimeCost += overtime_hour3!;
      }
      if (claimed_overtime! > 3) {
        overtimeCost += (claimed_overtime! - 3) * overtime_hour4!;
      }

      return total + overtimeCost;
    },
    0,
  );

  const totalOvertimeHours = statements.reduce(
    (totalHours: number, statement: Statement) => {
      const claimedOvertime = statement.claimed_overtime || 0;
      return totalHours + claimedOvertime;
    },
    0,
  );

  // Calculate transportation costs
  const totalTransportationOvertimeCosts = statements.reduce(
    (totalCost: number, statement: Statement) => {
      const kilometers = statement.kilometers || 0;
      const car = statement.car;
      const allowKilometers = car?.kilometer_allow || 0;
      const carRate = car?.kilometer_rate || 0;
      if (kilometers > allowKilometers) {
        const excessKilometers = kilometers - allowKilometers;
        totalCost += excessKilometers * carRate;
      }

      return totalCost;
    },
    0,
  );

  const superTotalLaborCosts =
    totalOvertimeCosts + totalTransportationOvertimeCosts;

  const currencySymbol = currencyUtil.getCurrencySymbol(currency);
  const totalMileageText = `${totalMileage} km`;
  const totalLaborCostsText = `${totalOvertimeCosts.toLocaleString()} ${currencySymbol}`;
  const totalOvertimeHoursText = `${totalOvertimeHours.toLocaleString()} hours`;
  const totalTransportationCostsText = `${totalTransportationOvertimeCosts.toLocaleString()} ${currencySymbol}`;
  const superTotalLaborCostsText = `${superTotalLaborCosts.toLocaleString()} ${currencySymbol}`;

  return (
    <>
      <Text fontSize="lg">Total overtime costs</Text>
      <HStack spacing={2} align="center" mb={4}>
        <FaCoins size="64px" />
        <Text fontSize={{ base: '6xl', md: '4xl', lg: '6xl' }}>
          {superTotalLaborCostsText}
        </Text>
      </HStack>

      <Text mb={1}>Costs by category</Text>
      <HStack spacing={4} wrap="wrap" mb={3}>
        <Box
          flex="1"
          minW="200px"
          p={4}
          borderWidth="1px"
          borderRadius="md"
          textAlign="center"
        >
          <Text>Total overtime labor costs</Text>
          <HStack spacing={2} align="center" justify="center">
            <Text fontSize="2xl">{totalLaborCostsText}</Text>
          </HStack>
        </Box>

        <Box
          flex="1"
          minW="200px"
          p={4}
          borderWidth="1px"
          borderRadius="md"
          textAlign="center"
        >
          <Text>Total overtime hours</Text>
          <HStack spacing={2} align="center" justify="center">
            <Text fontSize="2xl">{totalOvertimeHoursText}</Text>
          </HStack>
        </Box>
      </HStack>

      <HStack spacing={4} wrap="wrap" mb={4}>
        <Box
          flex="1"
          minW="200px"
          p={4}
          borderWidth="1px"
          borderRadius="md"
          textAlign="center"
        >
          <Text>Transportation overtime costs</Text>
          <HStack spacing={2} align="center" justify="center">
            <Text fontSize="2xl">{totalTransportationCostsText}</Text>
          </HStack>
        </Box>

        <Box
          flex="1"
          minW="200px"
          p={4}
          borderWidth="1px"
          borderRadius="md"
          textAlign="center"
        >
          <Text>Total excess mileage</Text>
          <HStack spacing={2} align="center" justify="center">
            <Text fontSize="2xl">{totalMileageText}</Text>
          </HStack>
        </Box>
      </HStack>

      <Box
        display="flex"
        justifyContent={{ base: 'center', 'dash-break1': 'flex-start' }}
        mt={4}
      >
        <ShiftsButton projectId={projectId} />
      </Box>
    </>
  );
};

export default DashboardCostsAdmin;
