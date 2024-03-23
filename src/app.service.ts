import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async uploadFiles(files: { avatar?: Express.Multer.File[], background?: Express.Multer.File[] }) {
    const avatarFilenames = files.avatar ? files.avatar.map(file => file.filename) : [];
    const backgroundFilenames = files.background ? files.background.map(file => file.filename) : [];
    // Faça a lógica de manipulação de arquivos aqui, se necessário
    return { avatarFilenames, backgroundFilenames };
}
}
