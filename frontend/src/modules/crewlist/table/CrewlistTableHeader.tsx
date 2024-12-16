import { type ReactNode } from 'react';
import { Th, Tooltip } from '@chakra-ui/react';
import { type HTMLChakraProps } from '@chakra-ui/react';

export type TooltipProps = HTMLChakraProps<'th'> & {
  tooltip?: ReactNode;
  children?: ReactNode;
};

export function CrewlistTableHeader({
  tooltip,
  children,
  ...rest
}: TooltipProps) {
  return (
    <Th zIndex={2} bg="white" textAlign="center" {...rest}>
      <Tooltip
        label={tooltip ?? children}
        placement="top"
        bg="gray.500"
        rounded={'lg'}
      >
        <span>{children}</span>
      </Tooltip>
    </Th>
  );
}
