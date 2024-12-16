import { type ReactNode } from 'react';
import { HTMLChakraProps, Th } from '@chakra-ui/react';

export type TimesheetTableHeaderProps = HTMLChakraProps<'th'> & {
  children?: ReactNode;
  zIndex?: number;
};

export function TimesheetTableHeader({
  children,
  zIndex,
  ...rest
}: TimesheetTableHeaderProps) {
  return (
    <Th
      position="sticky"
      bg="white"
      textAlign="center"
      zIndex={zIndex ?? 2}
      minHeight="max-content"
      {...rest}
    >
      <span>{children}</span>
    </Th>
  );
}
