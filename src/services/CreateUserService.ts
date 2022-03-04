import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    // Não será criado um repositório para Users, como foi criado para o Appointments, porque não será usado
    // pelo User um método específico, uma regra de negócio específica, será usado somento os métodos padrões.
    // Portanto, é possível criar aqui mesmo nos services as validações e métodos padrões.
    const usersRepository = getRepository(User);

    // Não pode haver usuário duplicado. Obs: a regra existe no model, mas para validação no banco de dados
    // É necessário criar as regras para a aplicação também.
    const checkUserExists = await usersRepository.findOne({
      where: { email }, // verifica se o email que está no banco é o mesmo que está sendo inserido aqui na criação
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8); // 8 'o tamanho do hash de caracteres

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
