import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    // Para que o nome de cada arquivo seja único
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
