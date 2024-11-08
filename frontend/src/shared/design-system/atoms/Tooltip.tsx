import { type ReactNode } from 'react';
import { Tooltip } from '@chakra-ui/react';

export type TooltipProps = {
  label: ReactNode;
  children?: ReactNode;
};

export function TooltipHeader({ label, children }: TooltipProps) {
  return (
    <Tooltip label={label} placement="top" bg="gray.500" rounded={'lg'}>
      {children}
    </Tooltip>
  );
}
