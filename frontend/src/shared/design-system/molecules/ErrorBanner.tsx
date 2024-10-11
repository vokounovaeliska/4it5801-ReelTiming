import { type ReactNode } from 'react';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  type AlertProps,
  AlertTitle,
} from '../atoms';

export type ErrorBannerProps = AlertProps & {
  title?: string;
  children?: ReactNode;
};

export function ErrorBanner({
  title,
  children,
  ...restProps
}: ErrorBannerProps) {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      p="4"
      borderRadius="md"
      {...restProps}
    >
      <AlertIcon boxSize="6" mr="0" />
      <AlertTitle mt="2" fontSize="lg">
        {title || 'Unknown error'}
      </AlertTitle>
      {children && (
        <AlertDescription maxWidth="sm" mt="4">
          {children}
        </AlertDescription>
      )}
    </Alert>
  );
}
