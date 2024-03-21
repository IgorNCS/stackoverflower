import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CommentService } from './comment/comment.service';
import { CommentController } from './comment/comment.controller';
import { PostSchema } from 'src/models/Post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';
import { UserSchema } from 'src/models/User.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema },{ name: 'User', schema: UserSchema }]), 
  ],
  controllers: [PostController, CommentController],
  providers: [PostService, CommentService,UserService]
})
export class PostModule {}
