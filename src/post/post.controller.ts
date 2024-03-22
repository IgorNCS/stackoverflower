import { Body, Controller, Post, Headers, Get, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { PostService } from './post.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'
import { multerConfig } from '../../src/files/multer-config';



@Controller('post')
export class PostController {
    constructor(private postService: PostService) { }
    @Post('new')
    create(@Headers() headers, @Body() body) {
        return this.postService.create(headers, body)
    }

    @Get('test')
    teste() {
        return 'ok'
    }

    //     @Post('upload')
    //   @UseInterceptors(FileInterceptor('file'))
    //   uploadFile(@UploadedFile() file) {
    //     console.log(file);

    //     return { filename: file.filename }; 
    //   }

    @Post('upload')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'avatar', maxCount: 1 },
        { name: 'background', maxCount: 1 },
    ]))
    uploadFile(@UploadedFiles() files: { avatar?: Express.Multer.File[], background?: Express.Multer.File[] }) {
        console.log(files);
    }

}
