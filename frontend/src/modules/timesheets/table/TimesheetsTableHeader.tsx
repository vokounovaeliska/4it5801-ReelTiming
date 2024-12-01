import { type ReactNode } from 'react';
import { Th } from '@chakra-ui/react';

export type TimesheetTableHeaderProps = {
  children?: ReactNode;
  left?: string;
  zIndex?: number;
};

export function TimesheetTableHeader({
  children,
  left,
  zIndex,
}: TimesheetTableHeaderProps) {
  return (
    <Th
      position="sticky"
      bg="white"
      textAlign="center"
      zIndex={zIndex ?? 2}
      top={0}
      left={left}
      minHeight="max-content"
    >
      <span>{children}</span>
    </Th>
  );
}
