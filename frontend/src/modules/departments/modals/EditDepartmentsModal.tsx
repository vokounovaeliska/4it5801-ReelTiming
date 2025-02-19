import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { EditDepartmentsTemplate } from '../templates/EditDepartmentsTemplate';

interface EditDepartmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
  userRole: string | null | undefined;
  projectName: string | null | undefined;
}

export function EditDepartmentsModal({
  isOpen,
  onClose,
  projectId,
  userRole,
  projectName,
}: EditDepartmentsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent m={2} textAlign="center" minWidth="fit-content" p={2}>
        <ModalHeader mt={8}>Edit departments for {projectName}</ModalHeader>
        <ModalCloseButton />
        <Box placeItems="center">
          <EditDepartmentsTemplate
            projectId={projectId}
            userRole={userRole}
            isInModal={true}
          />
        </Box>
      </ModalContent>
    </Modal>
  );
}
