import React, { forwardRef } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

interface LandingBoxProps extends BoxProps {
  children: React.ReactNode;
  bgGradient: string;
}

const LandingBox = forwardRef<HTMLDivElement, LandingBoxProps>(
  ({ children, bgGradient, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bgGradient={bgGradient}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

export default LandingBox;
