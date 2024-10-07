import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '../config';
import { JWTPayload } from '../types/types';

export const createToken = (content: string | object): string => {
  return jwt.sign(content, JWT_SECRET);
};

export const verifyToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, JWT_SECRET);
};

export const parseAndVerifyJWT = (token: string): JWTPayload | null => {
  const jwt = token.split(' ')[1];
  if (!jwt) {
    return null;
  }
  try {
    const payload = verifyToken(jwt) as JWTPayload;
    return payload;
  } catch (err) {
    return null;
  }
};
