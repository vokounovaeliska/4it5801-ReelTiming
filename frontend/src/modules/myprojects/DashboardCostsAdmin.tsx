import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, HStack, Text } from '@chakra-ui/react';
import { FaClock, FaCoins } from 'react-icons/fa';
import { Link as ReactRouterLink } from 'react-router-dom';

import { GET_CREWUSERINFO_TIMESHEETS } from '@frontend/gql/queries/GetCrewUserInfoTimesheets';
//import { GET_ADMIN_STATEMENTS } from '@frontend/gql/queries/GetStatements';
import { route } from '@frontend/route';

interface DashboardCostsProps {
  projectId: string;
  userId: string;
}

const DashboardCostsAdmin: React.FC<DashboardCostsProps> = ({
  projectId,
  userId,
}) => {
  const { loading, error } = useQuery(GET_CREWUSERINFO_TIMESHEETS, {
    variables: { userId, projectId },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading data!</Text>;

  // todo - cache

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
          <Text>Equipment rental costs</Text>
          <HStack spacing={2} align="center" justify="center">
            <Text fontSize="2xl">N/A</Text>
          </HStack>
        </Box>
      </HStack>

      <Box
        display="flex"
        justifyContent={{ base: 'center', md: 'flex-start' }}
        mt={4}
      >
        <Button
          as={ReactRouterLink}
          to={route.timesheets(projectId)}
          leftIcon={<FaClock />}
          aria-label="Timesheets"
          colorScheme="orange"
          variant="outline"
          size={{ base: 'xl', md: 'lg' }}
          padding="16px 32px"
          fontSize={{ base: '2xl', md: 'xl' }}
          _hover={{ bg: 'orange.600', color: 'white' }}
        >
          Timesheets
        </Button>
      </Box>
    </>
  );
};

export default DashboardCostsAdmin;
