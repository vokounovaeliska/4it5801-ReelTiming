import {
  Center,
  CenterProps,
  Spinner,
  SpinnerProps,
  Text,
  TextProps,
} from '@chakra-ui/react';

export type LoadingSpinnerProps = {
  title?: string;
  centerProps?: CenterProps; // Props for customizing the Center container
  spinnerProps?: SpinnerProps; // Props for customizing the Spinner
  textProps?: TextProps; // Props for customizing the Text
};

export function LoadingSpinner({
  title,
  centerProps,
  spinnerProps,
  textProps,
}: LoadingSpinnerProps) {
  return (
    <Center minHeight="100vh" {...centerProps}>
      <Spinner size="xl" color="orange.500" {...spinnerProps} />
      {title && (
        <Text ml={4} {...textProps}>
          Loading {title}...
        </Text>
      )}
    </Center>
  );
}
