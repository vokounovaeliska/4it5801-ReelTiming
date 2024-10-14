import React from 'react';
import { Image, type ImageProps } from '@chakra-ui/react';

export type AvatarPhotoProps = ImageProps & {
  size?: string;
};

export function AvatarPhoto({
  src,
  alt,
  size = '64px',
  ...restProps
}: AvatarPhotoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      borderRadius="32px"
      border="1px"
      borderColor="gray.100"
      w={size}
      h={size}
      maxW={size}
      {...restProps}
    />
  );
}
