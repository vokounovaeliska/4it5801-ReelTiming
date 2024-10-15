import { type ReactNode } from 'react';

import { chakra, type ChakraProps } from '../system';

export type ParagraphProps = ChakraProps & {
  children: ReactNode;
};

export function Paragraph(props: ParagraphProps) {
  return <chakra.p mb="3" {...props} />;
}
