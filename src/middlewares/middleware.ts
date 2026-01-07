import { verifyToken } from '../utils/jwt.js';
import { HTTPException } from 'hono/http-exception';

export const authAdminMiddleware = async (c: any, next: any) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader) {
    throw new HTTPException(401, {
      message: 'Unauthorized',
    });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = verifyToken(token);
    c.set('admin', decoded); 
    await next();
  } catch (err) {
    throw new HTTPException(401, {
      message: 'Invalid token',
    });
  }
};
