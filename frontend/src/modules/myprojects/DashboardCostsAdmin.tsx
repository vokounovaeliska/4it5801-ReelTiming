import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, HStack, Text } from '@chakra-ui/react';
import { FaClock, FaCoins } from 'react-icons/fa';

//import { GET_CREWUSERINFO_TIMESHEETS } from '@frontend/graphql/queries/GetCrewUserInfoTimesheets';
import { GET_ADMIN_STATEMENTS } from '@frontend/graphql/queries/GetStatements';
import { route } from '@frontend/route';
import { currencyUtil } from '@shared/currencyUtil';

import DashButton from './DashButton';

interface Statement {
  kilometers: number | null;
  // zde přidat další vlastnosti ze statement
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
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading data!</Text>;

  const statements: Statement[] = data?.statementsByProjectId || [];

  const totalMileage = statements.reduce(
    (total: number, statement: Statement) => {
      return total + (statement.kilometers || 0);
    },
    0,
  );

  // Získání symbolu měny
  const currencySymbol = currencyUtil.getCurrencySymbol(currency);

  const totalMileageText = `${totalMileage} km`;

  //   totalMileage > 0 ? `${totalKilometers} km`: 'N/A';

  // TODO - cache grab

  return (
    <>
      <Text fontSize="lg">Total costs</Text>
      <HStack spacing={2} align="center" mb={4}>
        <FaCoins size="64px" />
        <Text fontSize="6xl">N/A {currencySymbol}</Text>
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
          <Text>Overtime costs</Text>
          <HStack spacing={2} align="center" justify="center">
            <Text fontSize="2xl">N/A</Text>
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
        justifyContent={{ base: 'center', 'dash-break1': 'flex-start' }} //PŮVODNĚ TU BYLO md
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
