import { Body, Controller, HttpCode, HttpStatus, Post, Headers, Get } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService){}
    
    @Post('new')
    @HttpCode(HttpStatus.OK)
    create(@Body() body: any, @Headers() headers: any) {
        const { content, postId } = body;
        const authToken = headers.authorization; 
        return this.commentService.create({ content, postId, authToken });
    }

    @Get('all')
    test(@Headers() headers){
        console.log('b')
        return 'ok'
    }
}
