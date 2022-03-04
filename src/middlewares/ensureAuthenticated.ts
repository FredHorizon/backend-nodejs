// Middleware que verifica se o usuário está realmente autenticado na aplicação
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // Validção do token JWT
  const authHeader = req.headers.authorization;

  // Se não existir
  if (!authHeader) {
    throw new AppError('JWT toekn is missing.', 401);
  }

  // Se existir, tem que separar nesse formato: <Bearer asdasd45454asedq> em duas partes
  const [, token] = authHeader.split(' '); // [,token] somente a variável token será usada

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    // incluir a informação do id do usuário nas requisições que vierem a partir desse middleware
    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token.', 401);
  }
}
