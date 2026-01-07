// utils/jwt.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';
const JWT_EXPIRES = '1d';

export function generateAdminToken(payload: {
  id: number;
  name_admin: string;
}) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES,
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
