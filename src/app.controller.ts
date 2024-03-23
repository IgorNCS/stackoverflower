import { Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from 'express'; // Importe Response aqui
import * as fs from 'fs'; 


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile() file) {
  //   console.log(file);

  //   return { filename: file.filename }; 
  // }
  @Post('upload')
  @UseInterceptors(FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
  ]))
  async uploadFiles(@UploadedFiles() files: { avatar?: Express.Multer.File[], background?: Express.Multer.File[] }) {
      return this.appService.uploadFiles(files);
  }

  // @Get('/up')
  // async getFile(@Res() res: Response) {
  //   const filePath = join(__dirname, '..', 'uploads', 'f9223ec10b391a3c4f348f527930dfb410.jpg');
  //   console.log(filePath)

  //   const fileName = 'f9223ec10b391a3c4f348f527930dfb410.jpg';
  //   const relativePath = `uploads/${fileName}`;
  //   return res.send(relativePath);

  //   return res.send(filePath)
  // }

  @Get('/up')
  async getFile(@Res() res: Response) { 
    const fileName = 'f9223ec10b391a3c4f348f527930dfb410.jpg';
    const filePath = join(__dirname, '..', 'uploads', fileName);

    // Leia o arquivo e envie-o como resposta
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Erro ao ler o arquivo:', err);
        res.status(500).send('Erro ao ler o arquivo');
        return;
      }
      
      res.contentType('image/jpeg'); // Defina o tipo de conteúdo como imagem/jpeg
      res.send(data); // Envie os dados do arquivo como resposta
    });
  }


    @Get(':filename')
    async serveImage(@Param('filename') filename: string, @Res() res: Response) {
      // return res.sendFile(filename, { root: join(__dirname, '..', 'public', 'images') });
      return res.sendFile(filename,{root:join('./src/public/images')})
    }


}
