import { useToast as useChakraToast } from '@chakra-ui/react';

interface ToastProps {
  title: string;
  description: string;
  status: 'success' | 'error' | 'info' | 'warning';
}

const useToastNotification = () => {
  const toast = useChakraToast();

  const showToast = ({ title, description, status }: ToastProps) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
    });
  };

  return showToast;
};

export default useToastNotification;
