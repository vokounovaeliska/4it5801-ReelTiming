import { type ReactNode } from 'react';

import {
  Box,
  Flex,
  Heading,
  Paragraph,
  Stack,
} from '@frontend/shared/design-system';

export type FormSectionProps = {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  fontSize?: string;
};

export function FormSection({
  title,
  description,
  children,
  fontSize,
}: FormSectionProps) {
  return (
    <Flex
      direction={{
        base: 'column',
        md: 'row',
      }}
      columnGap="4"
    >
      <Box flex="1" textAlign="left" mt={2}>
        <Heading fontSize={fontSize}>{title}</Heading>
        {description && <Paragraph>{description}</Paragraph>}
      </Box>
      <Stack
        flex="2"
        p={{
          base: 4,
          md: 8,
        }}
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        borderWidth="2px"
      >
        {children}
      </Stack>
    </Flex>
  );
}
