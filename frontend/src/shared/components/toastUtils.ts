import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

export const showSuccessToast = (description: string) => {
  toast({
    title: 'Success',
    description,
    status: 'success',
  });
};

export const showErrorToast = (description: string) => {
  toast({
    title: 'Error',
    description,
    status: 'error',
  });
};
