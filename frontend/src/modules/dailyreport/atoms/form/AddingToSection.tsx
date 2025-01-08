import React from 'react';
import { Button, HStack, Input } from '@chakra-ui/react';

interface AddingToSectionProps {
  title: string;
  value: string;
  setTitle: (title: string) => void;
  setValue: (value: string) => void;
  handleAddItem: () => void;
}

const AddingToSection = ({
  title,
  value,
  setTitle,
  setValue,
  handleAddItem,
}: AddingToSectionProps) => {
  return (
    <HStack>
      <Input
        size={'sm'}
        rounded={'md'}
        w={'xxs'}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        size={'sm'}
        rounded={'md'}
        w={'xxs'}
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        size={'sm'}
        onClick={handleAddItem}
        colorScheme="orange"
        isDisabled={!title.trim()}
      >
        Add
      </Button>
    </HStack>
  );
};

export default AddingToSection;
