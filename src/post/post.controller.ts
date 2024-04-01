import { Body, Controller, Post, Headers, Get, UseInterceptors, UploadedFile, UploadedFiles, Param, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'
import { multerConfig } from '../../src/files/multer-config';
import { join } from 'path';
import { Response } from 'express';



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

    @Get(':postId')
    onePost(@Headers() header,@Param('postId') postId: string){
      return this.postService.findOneToPost(postId)
    }

    @Get(':filename')
    async serveImage(@Param('filename') filename: string, @Res() res: Response) {
      // return res.sendFile(filename, { root: join(__dirname, '..', 'public', 'images') });
      return res.sendFile(filename, { root: join('./src/public/images') })
    }
  



}
