import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/models/Post.schema';
import { UnauthorizedError } from 'src/helpers/api-errors';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';
import { JwtTokenDecoded } from './dto/jwt-token-decoded';

@Injectable()
export class PostService {
    constructor(@InjectModel('Post') private postModel: Model<Post>, private userService: UserService) { }

    async findAll() {
         console.log(await this.postModel.find().exec())
         return
        // if (this.getUserIdByToken()) {
        // }
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
