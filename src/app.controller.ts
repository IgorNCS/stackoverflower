import { Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from 'express'; // Importe Response aqui

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
  uploadFile(@UploadedFiles() files: { avatar?: Express.Multer.File[], background?: Express.Multer.File[] }) {
    console.log(files);
  }

  @Get('/up')
  async getFile(@Res() res: Response) {
    const filePath = join(__dirname, '..', 'uploads', 'f9223ec10b391a3c4f348f527930dfb410.jpg');
    console.log(filePath)

    const fileName = 'f9223ec10b391a3c4f348f527930dfb410.jpg';
    const relativePath = `uploads/${fileName}`;
    return res.send(relativePath);

    return res.send(filePath)
  }
}
