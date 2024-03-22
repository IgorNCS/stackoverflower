import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  // Configuração de armazenamento de disco
  storage: diskStorage({
    destination: './uploads', // Diretório onde os arquivos serão salvos
    filename: (req, file, cb) => {
      // Gere um nome de arquivo único
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      // Mantenha a extensão original do arquivo
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};

