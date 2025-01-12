import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  Textarea,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { format } from 'date-fns';

import { GetShiftOverviewPageDataQuery } from '@frontend/gql/graphql';

import {
  notifyMembers,
  transformToMemberDateMap,
} from '../utils/shiftOverviewUtils';

type NotifyMembersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  membersByDate: Map<
    number,
    Set<GetShiftOverviewPageDataQuery['projectUsers'][number]>
  >;
  workDays: Date[];
};

export const NotifyMembersModal = ({
  isOpen,
  onClose,
  membersByDate,
  workDays,
}: NotifyMembersModalProps) => {
  const [notificationDate, setNotificationDate] = useState<Date | null>(null);
  const [message, setMessage] = useState<string>('');
  const [usersToNotify, setUsersToNotify] = useState<
    Set<GetShiftOverviewPageDataQuery['projectUsers'][number]>
  >(new Set());

  const [datesByMeberId] = useState<Map<string, Set<number>>>(
    transformToMemberDateMap(membersByDate),
  );

  const getMembersToNotify = (selectedDate: Date) => {
    if (notificationDate?.getTime() === selectedDate.getTime()) {
      setNotificationDate(null);
      setUsersToNotify(new Set());
      return;
    }

    const usersToNotifyUpdated = new Set<
      GetShiftOverviewPageDataQuery['projectUsers'][number]
    >();
    for (const [dateKey, members] of membersByDate.entries()) {
      if (dateKey <= selectedDate.getTime()) {
        members.forEach((member) => usersToNotifyUpdated.add(member));
      }
    }

    setNotificationDate(selectedDate);
    setUsersToNotify(usersToNotifyUpdated);
  };

  const notifyMembersLocal = (
    message: string,
    members: Set<GetShiftOverviewPageDataQuery['projectUsers'][number]>,
    dates: Map<string, Set<number>>,
  ) => {
    notifyMembers(message, members, dates);

    setUsersToNotify(new Set());
    setMessage('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        maxWidth={{ base: '100%', sm: '600px', md: '800px', lg: '1200px' }}
        mx="auto"
      >
        <ModalHeader>Notify Members</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display={{ base: 'grid', md: 'flex' }} gap={4}>
            <Box flex="3" mb={4}>
              <Box>
                <Heading as="h5" size="sm" fontWeight="bold" mb={2}>
                  <Tooltip
                    label="Select the ending day of reporting interval."
                    rounded="md"
                  >
                    Select a Date
                  </Tooltip>
                </Heading>
              </Box>

              <Box
                maxHeight={{ base: '300px', sm: '150px' }}
                overflowY="auto"
                border="1px solid"
                borderColor="gray.200"
                p={2}
                borderRadius="md"
              >
                <SimpleGrid columns={{ base: 2, md: 5, xl: 7 }} spacing={2}>
                  {workDays.map((day) => (
                    <Button
                      key={day.toISOString()}
                      onClick={() => getMembersToNotify(day)}
                      size="sm"
                      variant="outline"
                      colorScheme={
                        notificationDate?.getTime() === day.getTime()
                          ? 'orange'
                          : 'gray'
                      }
                    >
                      {format(day, 'dd.MM.yy')}
                    </Button>
                  ))}
                </SimpleGrid>
              </Box>
            </Box>
            <Box flex="2">
              <FormControl isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your notification message"
                  resize="vertical"
                  maxH={'150px'}
                />
              </FormControl>
            </Box>
          </Box>

          <Box>
            <VStack spacing={4} align="stretch">
              {usersToNotify.size > 0 && (
                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Users to Notify:
                  </Text>
                  <Box
                    maxHeight="350px"
                    overflowY="auto"
                    border="1px solid"
                    borderColor="gray.200"
                    p={2}
                    borderRadius="md"
                  >
                    <VStack align="start">
                      {[...usersToNotify].map((user) => (
                        <Box key={user.id}>
                          <Box display={{ base: 'grid', sm: 'flex' }}>
                            <Text fontWeight="bold">{user.name}</Text>
                            <Box as="span" mx={1}>
                              {' '}
                            </Box>
                            <Text fontWeight="bold">{`(${user.email})`}</Text>
                          </Box>

                          <Text>
                            {' '}
                            {[...membersByDate]
                              .filter(
                                ([date, members]) =>
                                  members.has(user) &&
                                  notificationDate &&
                                  date <= notificationDate.getTime(),
                              )
                              .map(([date]) =>
                                new Date(date).toLocaleDateString('en-GB'),
                              )
                              .join(', ')}
                          </Text>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                </Box>
              )}
              {usersToNotify.size === 0 && (
                <Text>
                  All user reports are correct in your selected date interval!
                </Text>
              )}
            </VStack>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="orange"
            mr={3}
            onClick={() =>
              notifyMembersLocal(message, usersToNotify, datesByMeberId)
            }
            isDisabled={!notificationDate || usersToNotify.size === 0}
          >
            Notify Members
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
