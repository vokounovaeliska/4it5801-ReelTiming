import React, { useState } from 'react';
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';

import AddingToSection from '../form/AddingToSection';

interface SectionTableProps {
  title: string;
  data: { title: string; value: string }[];
  setData: (data: { title: string; value: string }[]) => void;
  newItem: { title: string; value: string };
  setNewItem: (newItem: { title: string; value: string }) => void;
  handleAddItem: () => void;
}

const SectionTable = ({
  title,
  data,
  setData,
  newItem,
  setNewItem,
  handleAddItem,
}: SectionTableProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<{ title: string; value: string }>({
    title: '',
    value: '',
  });

  const handleDelete = (index: number) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditItem(data[index]);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const updatedData = [...data];
      updatedData[editingIndex] = editItem;
      setData(updatedData);
      setEditingIndex(null);
      setEditItem({ title: '', value: '' });
    }
  };

  return (
    <VStack align="stretch" spacing={4} borderWidth={1} borderRadius="md" p={4}>
      <Heading size="md">{title}</Heading>

      <AddingToSection
        title={newItem.title}
        value={newItem.value}
        setTitle={(title) => setNewItem({ ...newItem, title })}
        setValue={(value) => setNewItem({ ...newItem, value })}
        handleAddItem={handleAddItem}
      />

      <Box overflowX="auto">
        <Table variant="simple" size="sm" minW="100%">
          <Thead>
            <Tr>
              <Th w="auto">Title</Th>
              <Th w="auto">Value</Th>
              <Th minW="10rem" w="auto">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index}>
                <Td>
                  {editingIndex === index ? (
                    <Textarea
                      size="xs"
                      rounded="md"
                      value={editItem.title}
                      onChange={(e) =>
                        setEditItem({ ...editItem, title: e.target.value })
                      }
                      resize="vertical"
                      minHeight={8}
                      h={'auto'}
                      w={'auto'}
                    />
                  ) : (
                    <Text whiteSpace="pre-wrap">{item.title}</Text>
                  )}
                </Td>
                <Td>
                  {editingIndex === index ? (
                    <Textarea
                      mx={2}
                      size="xs"
                      rounded="md"
                      value={editItem.value}
                      onChange={(e) =>
                        setEditItem({ ...editItem, value: e.target.value })
                      }
                      resize="vertical"
                      minHeight={4}
                      h={'auto'}
                      w={'auto'}
                    />
                  ) : (
                    <Text whiteSpace="pre-wrap">{item.value}</Text>
                  )}
                </Td>
                <Td>
                  {editingIndex === index ? (
                    <IconButton
                      mx={2}
                      aria-label="Save"
                      icon={<CheckIcon />}
                      colorScheme="orange"
                      size="xs"
                      onClick={handleSaveEdit}
                    />
                  ) : (
                    <IconButton
                      mx={2}
                      aria-label="Edit"
                      icon={<EditIcon />}
                      colorScheme="gray"
                      size="xs"
                      onClick={() => handleEdit(index)}
                    />
                  )}
                  <IconButton
                    aria-label="Delete"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    size="xs"
                    onClick={() => handleDelete(index)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

export default SectionTable;
