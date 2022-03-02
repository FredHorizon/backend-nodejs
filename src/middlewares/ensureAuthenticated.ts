// Middleware que verifica se o usuário está realmente autenticado na aplicação
import { Request, Response, NextFunction } from 'express';
import { decode, verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

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
    throw new Error('JWT toekn is missing.');
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
    throw new Error('Invalid JWT token.');
  }
}
