import React from 'react';
import { Image } from '@chakra-ui/react';

import logo from './logopng.png';

const Logo: React.FC = () => {
  return <Image src={logo} alt="Logo" boxSize="60px" mr={4} />;
};

export default Logo;
