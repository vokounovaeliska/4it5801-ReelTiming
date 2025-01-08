import {
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';

import AddingToSection from '../form/AddingToSection';

interface SectionTableProps {
  title: string;
  data: { title: string; value: string }[];
  newItem: { title: string; value: string };
  setNewItem: (newItem: { title: string; value: string }) => void;
  handleAddItem: () => void;
}

const SectionTable = ({
  title,
  data,
  newItem,
  setNewItem,
  handleAddItem,
}: SectionTableProps) => {
  return (
    <VStack align="stretch" spacing={4}>
      <Heading size="md">{title}</Heading>

      {/* Adding input fields and add button above the table */}
      <AddingToSection
        title={newItem.title}
        value={newItem.value}
        setTitle={(title) => setNewItem({ ...newItem, title })}
        setValue={(value) => setNewItem({ ...newItem, value })}
        handleAddItem={handleAddItem}
      />

      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>{item.title}</Td>
              <Td>{item.value}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default SectionTable;
