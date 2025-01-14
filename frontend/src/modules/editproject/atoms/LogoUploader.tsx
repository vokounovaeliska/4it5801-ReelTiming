import React, { useRef, useState } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Image as ChakraImage,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';

import {
  showErrorToast,
  showSuccessToast,
} from '@frontend/shared/design-system/molecules/toastUtils';

type LogoUploaderProps = {
  initialLogo?: string;
  onLogoChange: (newLogo: string | null) => void;
};

const LogoUploader: React.FC<LogoUploaderProps> = ({
  initialLogo = '',
  onLogoChange,
}) => {
  const [displayLogo, setDisplayLogo] = useState<string>(initialLogo);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width <= 800 && img.height <= 200) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result?.toString().split(',')[1];
            if (base64String) {
              setDisplayLogo(`data:image/png;base64,${base64String}`);
              onLogoChange(base64String);
            }
          };
          reader.readAsDataURL(file);
        } else {
          showErrorToast(
            'Image dimensions should be 800x200 pixels or smaller.',
          );
        }
      };
    } else {
      showErrorToast('Please upload a valid .png or .jpg file');
    }
  };

  const handleRemoveLogo = () => {
    setDisplayLogo('');
    onLogoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    showSuccessToast('Logo successfully removed');
  };

  return (
    <Box>
      <ChakraImage
        display={displayLogo ? 'block' : 'none'}
        src={displayLogo}
        alt="Uploaded Logo"
        w="400px"
        h="100px"
        objectFit="contain"
        objectPosition={{ base: 'center', md: 'left' }}
        ml={1}
        mb={4}
      />
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Input
          ref={fileInputRef}
          type="file"
          accept=".png, .jpeg"
          onChange={handleFileChange}
          w="auto"
        />
        {displayLogo && (
          <Button
            aria-label="Remove logo"
            leftIcon={<DeleteIcon />}
            colorScheme="red"
            size="md"
            onClick={handleRemoveLogo}
          >
            Remove logo
          </Button>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default LogoUploader;
