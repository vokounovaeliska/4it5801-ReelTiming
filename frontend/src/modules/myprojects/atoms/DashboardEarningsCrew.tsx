import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, HStack, Text } from '@chakra-ui/react';
import { FaCoins } from 'react-icons/fa';

import { GET_CREWUSERINFO_TIMESHEETS } from '@frontend/graphql/queries/GetCrewUserInfoTimesheets';
import { GET_ADMIN_STATEMENTS } from '@frontend/graphql/queries/GetStatements';
import { currencyUtil } from '@shared/currencyUtil';

import ShiftsButton from './buttons/ShiftsButton';

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
  car?: {
    id: string;
    kilometer_allow: number;
    kilometer_rate: number;
    name: string;
  } | null;
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

  const totalMileage = userStatements.reduce(
    (total: number, statement: Statement) => {
      const kilometers = statement.kilometers || 0;
      const car = statement.car;
      if (car && kilometers > car.kilometer_allow) {
        const excessKilometers = kilometers - car.kilometer_allow;
        return total + excessKilometers;
      }

      return total;
    },
    0,
  );

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

      if (claimed_overtime! >= 1) {
        overtimeEarnings += overtime_hour1!;
      }
      if (claimed_overtime! >= 2) {
        overtimeEarnings += overtime_hour2!;
      }
      if (claimed_overtime! >= 3) {
        overtimeEarnings += overtime_hour3!;
      }
      if (claimed_overtime! > 3) {
        overtimeEarnings += (claimed_overtime! - 3) * overtime_hour4!;
      }

      return total + overtimeEarnings;
    },
    0,
  );

  const totalOvertimeHours = userStatements.reduce(
    (total: number, statement: Statement) => {
      const claimedOvertime = statement.claimed_overtime || 0;
      return total + claimedOvertime;
    },
    0,
  );

  const totalTransportationCosts = userStatements.reduce(
    (totalCost: number, statement: Statement) => {
      const kilometers = statement.kilometers || 0;
      const car = statement.car;

      if (car && kilometers > car.kilometer_allow) {
        const excessKilometers = kilometers - car.kilometer_allow;
        const transportationCost = excessKilometers * car.kilometer_rate;
        totalCost += transportationCost;
      }

      return totalCost;
    },
    0,
  );

  const superTotalEarnings = totalOvertimeEarnings + totalTransportationCosts;

  const currencySymbol = currencyUtil.getCurrencySymbol(currency);
  const totalMileageText = `${totalMileage.toLocaleString()} km`;
  const totalLaborEarningsText = `${totalOvertimeEarnings.toLocaleString()} ${currencySymbol}`;
  const totalOvertimeHoursText = `${totalOvertimeHours.toLocaleString()} hours`;
  const totalTransportationCostsText = `${totalTransportationCosts.toLocaleString()} ${currencySymbol}`;
  const superTotalEarningsText = `${superTotalEarnings.toLocaleString()} ${currencySymbol}`;

  return (
    <>
      <Text fontSize="lg">Total overtime earnings</Text>
      <HStack spacing={2} align="center" mb={4}>
        <FaCoins size="64px" />
        <Text fontSize={{ base: '6xl', md: '4xl', lg: '6xl' }}>
          {superTotalEarningsText}
        </Text>
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
          <Text>Total overtime labor earnings</Text>
          <HStack spacing={2} align="center" justify="center">
            <Text fontSize="2xl">{totalLaborEarningsText}</Text>
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
          <Text>Transportation overtime earnings</Text>
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

export default DashboardEarningsCrew;
