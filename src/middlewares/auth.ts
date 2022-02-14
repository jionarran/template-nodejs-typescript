import { Request, Response, NextFunction } from 'express';

import Auth from '@src/helpers/auth';
import { User } from '@src/interfaces/User';

interface TokenPayload {
  user: User;
  iat: number;
  exp: number;
}

export default function AuthMiddleware(
  req: Partial<Request>,
  res: Partial<Response>,
  next: NextFunction,
): Response | void {
  const authorization = req.headers?.authorization as string;
  try {
    if (!authorization) {
      throw new Error('jwt must be provided');
    }
    const [, token] = authorization?.split(' ');
    const decoded = Auth.decodeToken(token);
    const { user } = decoded as { user: { id: string } };
    req.user = {
      id: user?.id || '',
    };
    next();
  } catch (error) {
    return res.status?.(401).send({ code: 401, error: error.message });
  }
}
