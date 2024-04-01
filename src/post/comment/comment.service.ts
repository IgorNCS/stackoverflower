import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from 'src/models/comment.schema';
import { UserService } from 'src/user/user.service';
import { PostService } from '../post.service';
import { Post } from 'src/models/Post.schema';

@Injectable()
export class CommentService {
    constructor(@InjectModel('Comment') private commentModel: Model<Comment>, private userService: UserService, private postService: PostService, @InjectModel('Post') private readonly postModel: Model<Post>) { }
    async create(params) {
        const user = await this.userService.getUserIdByToken(params.authToken);
        const post = await this.postModel.findById(params.postId);
    
        if (!user || !post) {
            throw new NotFoundException('Usuário ou post não encontrado');
        }  
        const newComment = new this.commentModel({
            postId: params.postId,
            authorId: user.id,
            text: params.content
        });
    
        const savedComment = await newComment.save();
    
        post.comments.push(savedComment._id);
        const posteSaved = await post.save();
        
        return await this.postService.findOneToPost(posteSaved._id);
    }
}


// postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true }, // Adicionando postId
// authorId: { type: String, required: true },
// text: { type: String, required: true },
// likes: { type: [String], default: [] },
// response: [{ type: Schema.Types.ObjectId, ref: 'Response' }] 