import { type ReactNode } from 'react';
import { Th, Tooltip } from '@chakra-ui/react';

export type TooltipProps = {
  label: ReactNode;
  children?: ReactNode;
  textColor?: string;
};

export function TooltipHeader({ label, children, textColor }: TooltipProps) {
  return (
    <Th textColor={textColor}>
      <Tooltip label={label} placement="top" bg="gray.500" rounded={'lg'}>
        <span>{children}</span>
      </Tooltip>
    </Th>
  );
}
