import React from 'react';
import { AbsoluteCenter, Box, Divider, Text } from '@chakra-ui/react';

interface ProjectOriginProps {
  name: string;
  company: string;
  currency: string;
  create_date: string;
  start_date: string;
  end_date: string;
}

const ProjectOrigin: React.FC<ProjectOriginProps> = ({
  name,
  company,
  currency,
  create_date,
  start_date,
  end_date,
}) => {
  return (
    <>
      <Box position="relative" padding-bottom="10">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          Origin
        </AbsoluteCenter>
      </Box>

      <Box
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent="center"
        alignItems={{ base: 'flex-start', md: 'center' }}
      >
        <Box flex="1" mr={4} p={4} display="flex" justifyContent="center">
          <Box textAlign="left">
            <Text fontSize="md" color="gray.600" mb={2}>
              <Box as="span" mr={2} color="green.500">
                🎬
              </Box>
              <strong>Project name:</strong> {name || 'N/A'}
            </Text>
            <Text fontSize="md" color="gray.600" mb={2}>
              <Box as="span" mr={2} color="green.500">
                🏢
              </Box>
              <strong>Production Company:</strong> {company || 'N/A'}
            </Text>
            <Text fontSize="md" color="gray.600" mb={2}>
              <Box as="span" mr={2} color="green.500">
                💰
              </Box>
              <strong>Project currency:</strong> {currency || 'N/A'}
            </Text>
          </Box>
        </Box>

        <Box flex="1" p={4} display="flex" justifyContent="center">
          <Box textAlign="left">
            <Text fontSize="md" color="gray.600" mb={2}>
              <Box as="span" mr={2} color="green.500">
                🗓️
              </Box>
              <strong>Created On:</strong>{' '}
              {new Date(create_date).toLocaleDateString()}
            </Text>
            <Text fontSize="md" color="gray.600" mb={2}>
              <Box as="span" mr={2} color="blue.500">
                🚀
              </Box>
              <strong>Start date:</strong>{' '}
              {new Date(start_date).toLocaleDateString()}
            </Text>
            <Text fontSize="md" color="gray.600" mb={2}>
              <Box as="span" mr={2} color="purple.500">
                🏁
              </Box>
              <strong>End date:</strong>{' '}
              {new Date(end_date).toLocaleDateString()}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProjectOrigin;
