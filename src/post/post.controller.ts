import { Body, Controller, Post, Headers, Get } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) { }
    @Post('new')
    create(@Headers() headers, @Body() body) {
        return this.postService.create(headers, body)
    }

    @Get('test')
    teste(){
        return 'ok'
    }
}
