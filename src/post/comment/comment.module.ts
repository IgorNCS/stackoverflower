import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/User.schema';
import { CommentSchema } from 'src/models/comment.schema';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { UserService } from 'src/user/user.service';
import { PostService } from '../post.service';
import { PostSchema } from 'src/models/Post.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema },{ name: 'User', schema: UserSchema },{ name: 'Post', schema: PostSchema }]),
      ],
      controllers:[CommentController],
      providers:[CommentService,UserService, PostService]
})
export class CommentModule {}
