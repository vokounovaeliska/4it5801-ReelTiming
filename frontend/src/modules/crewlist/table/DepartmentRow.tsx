import { Td, Tr } from '@chakra-ui/react';

export const DepartmentRow = ({
  departmentName,
}: {
  departmentName: string;
}) => (
  <Tr borderTop="solid" borderColor="gray.400">
    <Td
      colSpan={2}
      textTransform="uppercase"
      fontWeight="bold"
      position="sticky"
      left="0"
      zIndex={1}
      bg="gray.100"
    >
      {departmentName}
    </Td>
    <Td colSpan={12} bg="gray.100"></Td>
  </Tr>
);
