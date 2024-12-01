import { type ReactNode } from 'react';
import { Th, Tooltip } from '@chakra-ui/react';

export type TooltipProps = {
  label: ReactNode;
  children?: ReactNode;
};

export function CrewlistTableHeader({ label, children }: TooltipProps) {
  return (
    <Th
      position={'sticky'}
      top={0}
      zIndex={2}
      bg="#2D3748"
      textColor="white"
      textAlign="center"
    >
      <Tooltip label={label} placement="top" bg="gray.500" rounded={'lg'}>
        <span>{children}</span>
      </Tooltip>
    </Th>
  );
}
