import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { FaCoins } from 'react-icons/fa';

import { GET_ADMIN_STATEMENTS_LIGHT } from '@frontend/graphql/queries/GetStatements';
import { currencyUtil } from '@shared/currencyUtil';

import { Statement } from '../interface';

import ShiftsButton from './buttons/ShiftsButton';

interface DashboardCostsProps {
  projectId: string;
  currency: string;
}

const DashboardCostsAdmin: React.FC<DashboardCostsProps> = ({
  projectId,
  currency,
}) => {
  const { data, loading, error } = useQuery(GET_ADMIN_STATEMENTS_LIGHT, {
    variables: { projectId },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });
  console.log('data', data);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading data!</Text>;

  const statements: Statement[] = data?.statementsByProjectId || [];

  let totalMileage = 0;
  let totalOvertimeCosts = 0;
  let totalOvertimeHours = 0;
  let totalTransportationOvertimeCosts = 0;

  statements.forEach((statement) => {
    const kilometers = statement.kilometers ?? 0;
    const claimed_overtime = statement.claimed_overtime ?? 0;

    const car = statement.car;
    const allowKilometers = car?.kilometer_allow ?? 0;
    const carRate = car?.kilometer_rate ?? 0;
    const excessKilometers = Math.max(0, kilometers - allowKilometers);
    totalMileage += excessKilometers;
    totalTransportationOvertimeCosts += excessKilometers * carRate;

    const rate = statement.projectUser?.rate || {};
    const {
      overtime_hour1 = 0,
      overtime_hour2 = 0,
      overtime_hour3 = 0,
      overtime_hour4 = 0,
    } = rate;

    totalOvertimeHours += claimed_overtime;
    const hour1 = overtime_hour1 ?? 0;
    const hour2 = overtime_hour2 ?? 0;
    const hour3 = overtime_hour3 ?? 0;
    const hour4 = overtime_hour4 ?? 0;

    if (claimed_overtime >= 1) totalOvertimeCosts += hour1;
    if (claimed_overtime >= 2) totalOvertimeCosts += hour2;
    if (claimed_overtime >= 3) totalOvertimeCosts += hour3;
    if (claimed_overtime > 3) {
      totalOvertimeCosts += (claimed_overtime - 3) * hour4;
    }
  });

  const superTotalLaborCosts =
    totalOvertimeCosts + totalTransportationOvertimeCosts;

  const currencySymbol = currencyUtil.getCurrencySymbol(currency);
  const totalMileageText = `${totalMileage.toLocaleString()} km`;
  const totalLaborCostsText = `${totalOvertimeCosts.toLocaleString()} ${currencySymbol}`;
  const totalOvertimeHoursText = `${totalOvertimeHours.toLocaleString()} hours`;
  const totalTransportationCostsText = `${totalTransportationOvertimeCosts.toLocaleString()} ${currencySymbol}`;
  const superTotalLaborCostsText = `${superTotalLaborCosts.toLocaleString()} ${currencySymbol}`;

  const isLargeText = superTotalLaborCostsText.length > 10; // Podmínka pro příliš velké číslo
  const Stack = isLargeText ? VStack : HStack;

  return (
    <>
      <Text fontSize="lg">Total overtime costs</Text>
      <Stack spacing={2} align="center" my={4}>
        <FaCoins size="64px" />
        <Text fontSize={{ base: '5xl', md: '5xl', xl: '6xl' }}>
          {superTotalLaborCostsText}
        </Text>
      </Stack>

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
