import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react';
import { format } from 'date-fns';

import {
  AddShiftOverviewMutation,
  AddShiftOverviewMutationVariables,
  DeleteShiftOverviewMutation,
  DeleteShiftOverviewMutationVariables,
  EditShiftOverviewMutation,
  EditShiftOverviewMutationVariables,
  GetShiftOverviewPageDataQuery,
} from '@frontend/gql/graphql';
import { ADD_SHIFT_OVERVIEW } from '@frontend/graphql/mutations/AddShiftOverview';
import { DELETE_SHIFT_OVERVIEW } from '@frontend/graphql/mutations/DeleteShiftOverview';
import { EDIT_SHIFT_OVERVIEW } from '@frontend/graphql/mutations/EditShiftOverview';

import { ShiftOverviewHeader } from '../atoms/ShiftOverviewHeader';
import { ShiftWorkedReportedIcons } from '../atoms/ShiftWorkedReportedIcons';
import {
  getAllDatesBetween,
  groupUsersByDepartment,
  handleSave,
} from '../utils/shiftOverviewUtils';

type Props = {
  data?: GetShiftOverviewPageDataQuery;
  refetch: () => void;
};

export const ShiftOverviewTable = ({ data, refetch }: Props) => {
  const days: Date[] = getAllDatesBetween(
    data?.project?.start_date,
    data?.project?.end_date,
  );

  const shootingDays = data?.shootingDaysByProject || [];
  const groupedUsers = groupUsersByDepartment(data?.projectUsers);

  const sortedDepartments = Object.keys(groupedUsers).sort(
    (a, b) => groupedUsers[a].orderIndex - groupedUsers[b].orderIndex,
  );

  const [shiftStates, setShiftStates] = useState<Record<string, boolean>>({});

  const [addShiftOverview] = useMutation<
    AddShiftOverviewMutation,
    AddShiftOverviewMutationVariables
  >(ADD_SHIFT_OVERVIEW);

  const [editShiftOverview] = useMutation<
    EditShiftOverviewMutation,
    EditShiftOverviewMutationVariables
  >(EDIT_SHIFT_OVERVIEW);

  const [deleteShiftOverview] = useMutation<
    DeleteShiftOverviewMutation,
    DeleteShiftOverviewMutationVariables
  >(DELETE_SHIFT_OVERVIEW);

  const handleCheckboxChange = (
    memberId: string,
    date: Date,
    isChecked: boolean,
  ) => {
    const key = `${memberId}/${format(date, 'yyyy-MM-dd')}`;
    setShiftStates((prev) => ({ ...prev, [key]: isChecked }));
  };

  return (
    <Box maxWidth="100%">
      <TableContainer className="custom-scrollbar">
        <Box
          overflowX="auto"
          overflowY="auto"
          maxHeight={'67vh'}
          sx={{
            '::-webkit-scrollbar': {
              height: '12px',
            },
            '::-webkit-scrollbar-track': {
              background: '#2D3748',
            },
            '::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '6px',
            },
            '::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
            scrollbarWidth: 'thin',
            scrollbarColor: '#2D3748 white',
          }}
        >
          <Table variant="simple" size="sm">
            <ShiftOverviewHeader shootingDays={shootingDays} days={days} />
            {sortedDepartments.map((department) => (
              <Tbody key={`department-${department}`}>
                <Tr>
                  <Td
                    bg="gray.50"
                    borderTop="solid"
                    borderColor="gray.300"
                    colSpan={days.length + 2}
                    style={{ fontWeight: 'bold', textAlign: 'left' }}
                  >
                    {department}
                  </Td>
                </Tr>
                {groupedUsers[department]?.users.map((member) => (
                  <Tr key={member.id}>
                    <Td>{member.position}</Td>
                    <Td>
                      {member.surname} {member.name} {member.id}
                    </Td>
                    {days.map((day) => {
                      const key = `${member.id}/${format(day, 'yyyy-MM-dd')}`;
                      const hasWorked =
                        shiftStates[key] ??
                        data?.shiftOverviewsByProjectId.some((shift) =>
                          shift.crew_working.some(
                            (crewMember) =>
                              crewMember.id === member.id &&
                              format(new Date(shift.date), 'yyyy-MM-dd') ===
                                format(day, 'yyyy-MM-dd'),
                          ),
                        );

                      const hasReported = member.statement?.some(
                        (report) =>
                          format(new Date(report.start_date), 'yyyy-MM-dd') ===
                          format(day, 'yyyy-MM-dd'),
                      );

                      return (
                        <Td key={key} textAlign="center">
                          <Flex align="center" gap={2}>
                            <Checkbox
                              isChecked={hasWorked}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  member.id,
                                  day,
                                  e.target.checked,
                                )
                              }
                              colorScheme="gray"
                            />
                            {hasWorked && (
                              <ShiftWorkedReportedIcons
                                hasWorked={hasWorked}
                                hasReported={hasReported}
                              />
                            )}
                          </Flex>
                        </Td>
                      );
                    })}
                  </Tr>
                ))}
              </Tbody>
            ))}
          </Table>
        </Box>
      </TableContainer>
      <Button
        mt={4}
        colorScheme="orange"
        onClick={() =>
          handleSave({
            data,
            shiftStates,
            addShiftOverview,
            editShiftOverview,
            deleteShiftOverview,
            refetch,
          })
        }
      >
        Save Changes
      </Button>
    </Box>
  );
};
