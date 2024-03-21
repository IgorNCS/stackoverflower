import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/models/Post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { NotFoundError, UnauthorizedError } from 'src/helpers/api-errors';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserService } from 'src/user/user.service';


@Injectable()
export class PostService {
    constructor(@InjectModel('Post') private postModel: Model<Post>, private userService: UserService) { }

    async create(headers, CreatePostDto: CreatePostDto): Promise<Post> {
        const createdPost = new this.postModel(CreatePostDto)
        return await createdPost.save()
    }

    async findAll(): Promise<Post[]> {
        return this.postModel.find().exec()
    }

    async remove(params, token) {
        if (this.userService.verifyToken(token)) {
            if (this.isAuthor(params.user.id, params.post.authorId)) {
                return this.postModel.findByIdAndDelete(params.id)
            } else {
                throw new UnauthorizedError('Não é o dono do Post');
            }
        } else {
            throw new UnauthorizedError('Problema no token');
        }

    }

    async isAuthor(id: string, AuthorId: string): Promise<boolean> {
        if (id == AuthorId) {
            return true
        }
        return false
    }

    async update(updatePostDto: UpdatePostDto, token): Promise<Post> {
        if (this.userService.verifyToken(token)) {
            if (this.isAuthor(token.id, updatePostDto.authorId)) {
                return await this.postModel.findByIdAndUpdate(updatePostDto.id, updatePostDto, { new: true })
            } else {
                throw new UnauthorizedError('Não é o dono do Post');
            }
        } else {
            throw new UnauthorizedError('Problema no token');
        }

    }
}
