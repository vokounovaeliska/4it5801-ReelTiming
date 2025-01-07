import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, HStack, Text } from '@chakra-ui/react';
import { FaClock, FaCoins } from 'react-icons/fa';

import { GET_CREWUSERINFO_TIMESHEETS } from '@frontend/graphql/queries/GetCrewUserInfoTimesheets';
import { GET_ADMIN_STATEMENTS } from '@frontend/graphql/queries/GetStatements';
import { route } from '@frontend/route';
import { currencyUtil } from '@shared/currencyUtil';

import DashButton from '../atoms/DashButton';

interface DashboardEarningsProps {
  projectId: string;
  userId: string;
  currency: string;
}

interface Statement {
  projectUser: {
    id: string;
    rate?: {
      standard_rate?: number | null;
      overtime_hour1?: number | null;
      overtime_hour2?: number | null;
      overtime_hour3?: number | null;
      overtime_hour4?: number | null;
    } | null;
  };
  shift_lenght: number;
  claimed_overtime?: number | null;
  kilometers?: number | null;
}

const DashboardEarningsCrew: React.FC<DashboardEarningsProps> = ({
  projectId,
  userId,
  currency,
}) => {
  const {
    loading: loadingUserInfo,
    error: errorUserInfo,
    data: dataUserInfo,
  } = useQuery(GET_CREWUSERINFO_TIMESHEETS, {
    variables: { userId, projectId },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  const {
    loading: loadingKilometers,
    error: errorKilometers,
    data: dataKilometers,
  } = useQuery(GET_ADMIN_STATEMENTS, {
    skip: !dataUserInfo?.projectUserDetails?.id,
    variables: { projectId: projectId },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  if (loadingUserInfo || loadingKilometers) return <Text>Loading...</Text>;
  if (errorUserInfo || errorKilometers) return <Text>Error loading data!</Text>;

  const userProjectInfo = dataUserInfo?.projectUserDetails;

  if (!userProjectInfo) {
    return <Text>No user project info available!</Text>;
  }

  const statements: Statement[] = dataKilometers?.statementsByProjectId || [];
  const userStatements = statements.filter(
    (statement) => statement.projectUser.id === userProjectInfo?.id,
  );

  // Calculate total mileage for the specific user
  const totalMileage = userStatements.reduce(
    (total: number, statement: Statement) => {
      return total + (statement.kilometers || 0);
    },
    0,
  );

  // Calculate total overtime earnings for the specific user
  const totalOvertimeEarnings = userStatements.reduce(
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
      let overtimeEarnings = 0;

      // Apply overtime rates based on claimed overtime
      if (claimed_overtime! >= 1) {
        overtimeEarnings += overtime_hour1!; // 1st overtime hour
      }
      if (claimed_overtime! >= 2) {
        overtimeEarnings += overtime_hour2!; // 2nd overtime hour
      }
      if (claimed_overtime! >= 3) {
        overtimeEarnings += overtime_hour3!; // 3rd overtime hour
      }
      if (claimed_overtime! > 3) {
        overtimeEarnings += (claimed_overtime! - 3) * overtime_hour4!; // Additional overtime hours
      }

      return total + overtimeEarnings;
    },
    0,
  );

  // Calculate total labor earnings (standard earnings + overtime)
  const totalLaborEarnings = userStatements.reduce(
    (total: number, statement: Statement) => {
      const standardRate = statement.projectUser.rate?.standard_rate ?? 0;
      const shiftLength = statement.shift_lenght || 0;

      // Standard labor earnings (shift_lenght * standard_rate)
      const laborEarnings = shiftLength * standardRate;

      return total + laborEarnings;
    },
    0,
  );

  const superTotalLaborEarnings = totalLaborEarnings + totalOvertimeEarnings;

  // Get currency symbol
  const currencySymbol = currencyUtil.getCurrencySymbol(currency);

  const totalMileageText = `${totalMileage} km`;
  const superTotalLaborEarningsText = `${superTotalLaborEarnings.toLocaleString()} ${currencySymbol}`;
  const totalOvertimeEarningsText = `${totalOvertimeEarnings.toLocaleString()} ${currencySymbol}`;

  return (
    <>
      <Text fontSize="lg">Total earnings</Text>
      <HStack spacing={2} align="center" mb={4}>
        <FaCoins size="64px" />
        <Text fontSize="6xl">N/A {currencySymbol}</Text>
      </HStack>

      <Text mb={1}>Earnings by category</Text>
      <HStack spacing={4} wrap="wrap" mb={3}>
        <Box
          flex="1"
          minW="200px"
          p={4}
          borderWidth="1px"
          borderRadius="md"
          textAlign="center"
        >
          <Text>Total labor earnings</Text>
          <HStack spacing={2} align="center" justify="center">
            <Text fontSize="2xl">{superTotalLaborEarningsText}</Text>
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
          <Text>Overtime earnings</Text>
          <HStack spacing={2} align="center" justify="center">
            <Text fontSize="2xl">{totalOvertimeEarningsText}</Text>
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
          <Text>Transportation earnings</Text>
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
          <Text>Mileage</Text>
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

export default DashboardEarningsCrew;
