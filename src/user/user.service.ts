import { BadRequestException, HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadRequestError, UnauthorizedError } from 'src/helpers/api-errors';
import { User } from 'src/models/User.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user-dto';
import * as jwt from 'jsonwebtoken';
import { response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';


@Injectable()
export class UserService {
    tokens: any;
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async hasEmail(verifyEmail: string): Promise<boolean> {
        const res = await this.userModel.find({ email: verifyEmail }).exec();
        if (res.length > 0) {
            return true
        }
        return false
    };

    async getNameById(id) {
        const user = await this.userModel.findById(id).exec(); // Use findById para obter diretamente o usuário pelo ID
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        return user.name; // Retorna o nome do usuário
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        if (!await this.hasEmail(createUserDto.email)) {
            const hashPassword = await bcrypt.hash(createUserDto.password, 10);
            createUserDto.password = hashPassword;
            const createdUser = new this.userModel(createUserDto);
            try {
                await createdUser.save();
                return this.createToken(createdUser);
            } catch (error) {
                throw new BadRequestError('Problema ao tentar criar usuário');
            }
        } else {
            // Aqui enviamos a resposta com o status 400 e o corpo da mensagem
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                errorCode: 'EmailExist',
                message: 'O email já está em uso!',
            }, HttpStatus.BAD_REQUEST);
        }
    }


    async login(user: LoginUserDto) {
        if (await this.hasEmail(user.email)) {
            const userFound = await this.userModel.findOne({ email: user.email }).exec();
            if (await bcrypt.compare(user.password, userFound.password)) {
                const token = this.createToken(userFound);

                return token;
            } else {
                console.log('a')
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    errorCode: 'IncorrectPassword',
                    message: 'Senha incorreta',
                }, HttpStatus.BAD_REQUEST);
            }
        } else {
            // Email não encontrado
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                errorCode: 'EmailNotExist',
                message: 'E-mail não existe',
            }, HttpStatus.BAD_REQUEST);
        }
    }


    async remove(body: any, headers) {
        if (await this.verifyToken(headers.token)) {
            const userFound = await this.userModel.findOne({ email: body.email }).exec();
            if (await bcrypt.compare(body.password, userFound.password)) {
                await this.userModel.findByIdAndDelete(userFound.id).exec()
            } else {
                throw new BadRequestError('Senha incorreta')
            }
        } else {
            throw new UnauthorizedError('Problema no token');
        }
    }

    async verifyPassword(password, confirmPassword) {
        return await bcrypt.compare(password, confirmPassword);
    }

    async verifyToken(headers) {
        let token: any
        jwt.verify(headers.token, process.env.JWT_SECRET, function (err: any, decoded: any) {
            token = decoded
        })
        return token || false
    }

    createToken(user: any) {
        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
            expiresIn: '8d'
            // expiresIn: 10
        })

        return token
    }

}
