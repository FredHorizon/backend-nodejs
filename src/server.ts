import 'reflect-metadata';
import express from 'express';
import routes from './routes';

import uploadConfig from './config/upload';
import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory)); // servir arquivos de forma estática
app.use(routes); // routes torna-se um middleware agora

app.listen(3333, () => {
  console.log('Server Started on port 3333.');
});
