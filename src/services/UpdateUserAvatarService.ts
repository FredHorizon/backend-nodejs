// Subir a imagem e remover a anterior quando o avatar for atualizado
// Validar se usuário que está autenticado realmente existe
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    // Apesar de já haver uma validção de usuário autenticado fora desse service
    // é necessário verificar nesse próprio service se as variáveis que estão sendo recebidas aqui
    // são variáveis válidas, ou seja, não é seguro se basear em validações externas.
    if (!user) {
      throw new AppError('Only authenticated users can avatar.', 401);
    }

    if (user.avatar) {
      // Deletar avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      // o método <stat> veirifca o status de um arquivo, mas só se ele existir
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      // Se o arquivo existir, deleta com unlink
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    // Atualiza
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
