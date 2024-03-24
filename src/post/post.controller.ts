import { Body, Controller, Post, Headers, Get, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { PostService } from './post.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'
import { multerConfig } from '../../src/files/multer-config';



@Controller('post')
export class PostController {
    constructor(private postService: PostService) { }

    @Post('new')
    @UseInterceptors(FileFieldsInterceptor([
      { name: 'images', maxCount: 10 }
    ]))
    async uploadFiles(
      @UploadedFiles() files: { images?: Express.Multer.File[] }, 
      @Body('content') content: string,
      @Headers('Authorization') authToken: string,
    ) {
      return this.postService.create(files,content,authToken);
    }

    @Get('all')
    test(@Headers() headers){
        return this.postService.findAll()
    }



}
