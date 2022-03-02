// Para sobreescrever uma tipagem de dentro do epxress
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
