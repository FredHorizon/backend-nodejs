import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes); // routes torna-se um middleware agora

app.listen(3333, () => {
  console.log('Server Started on port 3333.');
});
