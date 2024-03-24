import { Body, Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from 'express'; // Importe Response aqui



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image_1', maxCount: 1 },
    { name: 'image_2', maxCount: 1 },
    { name: 'image_3', maxCount: 1 },
    { name: 'image_4', maxCount: 1 },
    { name: 'image_5', maxCount: 1 },
    { name: 'image_6', maxCount: 1 },
    { name: 'image_7', maxCount: 1 },
    { name: 'image_8', maxCount: 1 },
  ]))
  async uploadFiles(@UploadedFiles() files: { avatar?: Express.Multer.File[], background?: Express.Multer.File[] }, @Body('content') content: string) {
    console.log('Texto:', content);
    return this.appService.uploadFiles(files,content);
  }



  @Get(':filename')
  async serveImage(@Param('filename') filename: string, @Res() res: Response) {
    // return res.sendFile(filename, { root: join(__dirname, '..', 'public', 'images') });
    return res.sendFile(filename, { root: join('./src/public/images') })
  }


}
