import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';

import uploadConfig from './config/upload';
import AppError from './errors/AppError';
import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory)); // servir arquivos de forma estática
app.use(routes); // routes torna-se um middleware agora

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Se for uma instância de AppErro, significa que o erro é oriundo do uso aplicação
  // Se é de uso aplicação, é possível fazer uma tratativa de erro mais amigável para uma solução mais rápida.
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  // Caso o erro não seja de uso da aplicação especificamente, mas de lógica ou método com erro de digitação,
  // a tratativa de erro é mais genérica, porque não se sabe ao certo a origem do erro.
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

app.listen(3333, () => {
  console.log('Server Started on port 3333.');
});
