import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key';

export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}
