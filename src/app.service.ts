import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

async uploadFiles(files: { [fieldName: string]: Express.Multer.File[] },content) {
  const filenames: { [fieldName: string]: string[] } = {};

  // Itera sobre cada campo nos arquivos recebidos
  for (const fieldName in files) {
      if (Object.prototype.hasOwnProperty.call(files, fieldName)) {
          filenames[fieldName] = files[fieldName].map(file => file.filename);
      }
  }
  console.log(filenames,content)
  // Faça a lógica de manipulação de arquivos aqui, se necessário
  return filenames;
}


}
