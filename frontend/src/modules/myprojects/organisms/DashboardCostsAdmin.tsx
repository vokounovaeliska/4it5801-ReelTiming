import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, HStack, Text } from '@chakra-ui/react';
import { FaClock, FaCoins } from 'react-icons/fa';

import { GET_ADMIN_STATEMENTS } from '@frontend/gql/queries/GetStatements';
import { route } from '@frontend/route';
import { currencyUtil } from '@shared/currencyUtil';

import DashButton from '../atoms/DashButton';

interface Statement {
  kilometers: number | null;
  projectUser: {
    rate: {
      standard_rate: number;
      overtime_hour1: number;
      overtime_hour2: number;
      overtime_hour3: number;
      overtime_hour4: number;
    };
  };
  shift_lenght: number;
  claimed_overtime: number;
}

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

  // Calculate total mileage
  const totalMileage = statements.reduce(
    (total: number, statement: Statement) => {
      return total + (statement.kilometers || 0);
    },
    0,
  );

  // Calculate total overtime costs
  const totalOvertimeCosts = statements.reduce(
    (total: number, statement: Statement) => {
      const { claimed_overtime } = statement;
      const { overtime_hour1, overtime_hour2, overtime_hour3, overtime_hour4 } =
        statement.projectUser.rate;

      let overtimeCost = 0;

      // Apply overtime rates based on claimed overtime
      if (claimed_overtime >= 1) {
        overtimeCost += overtime_hour1; // 1st overtime hour
      }
      if (claimed_overtime >= 2) {
        overtimeCost += overtime_hour2; // 2nd overtime hour
      }
      if (claimed_overtime >= 3) {
        overtimeCost += overtime_hour3; // 3rd overtime hour
      }
      if (claimed_overtime > 3) {
        overtimeCost += (claimed_overtime - 3) * overtime_hour4; // Additional overtime hours
      }

      return total + overtimeCost;
    },
    0,
  );

  // Calculate total labor costs (standard costs + overtime)
  const totalLaborCosts = statements.reduce(
    (total: number, statement: Statement) => {
      const standardRate = statement.projectUser.rate.standard_rate;
      const shiftLength = statement.shift_lenght || 0;

      // Standard labor cost (shift_lenght * standard_rate)
      const laborCost = shiftLength * standardRate;

      return total + laborCost;
    },
    0,
  );

  const superTotalLaborCosts = totalLaborCosts + totalOvertimeCosts;

  // Get currency symbol
  const currencySymbol = currencyUtil.getCurrencySymbol(currency);

  const totalMileageText = `${totalMileage} km`;
  //const totalLaborCostsText = `${totalLaborCosts} ${currencySymbol}`;
  const superTotalLaborCostsText = `${superTotalLaborCosts.toLocaleString()} ${currencySymbol}`;
  const totalOvertimeCostsText = `${totalOvertimeCosts.toLocaleString()} ${currencySymbol}`;

  return (
    <>
      <Text fontSize="lg">Total costs</Text>
      <HStack spacing={2} align="center" mb={4}>
        <FaCoins size="64px" />
        <Text fontSize="6xl">N/A</Text>
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
          <Text>Total labor costs</Text>
          <HStack spacing={2} align="center" justify="center">
            <Text fontSize="2xl">{superTotalLaborCostsText}</Text>
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
          <Text>Overtime costs</Text>
          <HStack spacing={2} align="center" justify="center">
            <Text fontSize="2xl">{totalOvertimeCostsText}</Text>
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
          <Text>Transportation costs</Text>
          <HStack spacing={2} align="center" justify="center">
            <Text fontSize="2xl">N/A</Text>
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
          <Text>Total mileage</Text>
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
        <DashButton
          text="Timesheets"
          icon={<FaClock />}
          ariaLabel="Timesheets"
          to={route.timesheets(projectId)}
        />
      </Box>
    </>
  );
};

export default DashboardCostsAdmin;
