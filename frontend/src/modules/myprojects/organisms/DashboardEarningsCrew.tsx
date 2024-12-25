import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, HStack, Text } from '@chakra-ui/react';
import { FaClock, FaCoins } from 'react-icons/fa';

import { GET_CREWUSERINFO_TIMESHEETS } from '@frontend/gql/queries/GetCrewUserInfoTimesheets';
import { GET_ADMIN_STATEMENTS } from '@frontend/gql/queries/GetStatements';
import { route } from '@frontend/route';
import { currencyUtil } from '@shared/currencyUtil';

import DashButton from '../atoms/DashButton';

interface DashboardEarningsProps {
  projectId: string;
  userId: string;
  currency: string;
}

interface ProjectUser {
  id: string;
}

interface Statement {
  projectUser: ProjectUser;
  kilometers: number | null;
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
          <Text>Overtime earnings</Text>
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
