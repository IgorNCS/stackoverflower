import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/models/Post.schema';
import { UnauthorizedError } from 'src/helpers/api-errors';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';
import { JwtTokenDecoded } from './dto/jwt-token-decoded';
import { Comment } from 'src/models/comment.schema';

@Injectable()
export class PostService {
    constructor(@InjectModel('Post') private postModel: Model<Post>, @InjectModel('Comment') private commentModel: Model<Comment>, private userService: UserService) { }
    
    async findAll() {
        const posts = await this.postModel.find().exec();
        const updatedPosts = await Promise.all(posts.map(async (post) => {
            const authorName = await this.userService.getNameById(post.authorId);
            const updatedComments = await Promise.all(post.comments.map(async (commentId) => {
                const comment = await this.commentModel.findById(commentId); // Busca o comentário pelo ID
                const authorCommentName = await this.userService.getNameById(comment.authorId);
                const authorCommentImage = await this.userService.getProfileImageById(comment.authorId);
                return { ...comment.toJSON(), authorCommentName, authorCommentImage };
            }));
            return { ...post.toJSON(), authorName, comments: updatedComments };
        }));
        return updatedPosts;
    }


    async findPostById(postId) {
        const post = await this.postModel.findById(postId);
        if (!post) {
            throw new NotFoundException('Post não encontrado');
        }
        return post
    }

    async addComment(comment, postId) {
        const post = await this.findPostById(postId);
        post.comments.push(comment._id);
        return post.save();
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

    async getUserIdByToken(token: string): Promise<JwtTokenDecoded | undefined> {
        try {
            const decodedToken = await new Promise<JwtTokenDecoded>((resolve, reject) => {
                jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: JwtTokenDecoded) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(decoded);
                    }
                });
            });

            return decodedToken;
        } catch (error) {
            console.error('Erro ao decodificar o token:', error);
            return undefined;
        }
    }

    async create(files: { [fieldName: string]: Express.Multer.File[] }, content: string, token: string) {
        const filenames: { [fieldName: string]: string[] } = {};
        const tokenId: JwtTokenDecoded | undefined = await this.getUserIdByToken(token);

        for (const fieldName in files) {
            if (Object.prototype.hasOwnProperty.call(files, fieldName)) {
                filenames[fieldName] = files[fieldName].map(file => file.filename);
            }
        }
        if (tokenId && tokenId.id) {
            const createPost = {
                imageSrc: filenames.images,
                authorId: tokenId.id,
                text: content
            }

            const createdPost = new this.postModel(createPost)
            return await createdPost.save()
        }
    }
}
