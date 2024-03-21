import { Controller, Post, Body, Get, Headers, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    this: any;
    constructor(private userService: UserService){}

    @Post('new')
    create(@Body() body){
        return this.userService.create(body)
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() body){
        return this.userService.login(body)
    }

    @Get('token')
    test(@Headers() headers){
        return this.userService.verifyToken(headers)
    }

    @Delete('delete')
    delete(@Headers() headers, @Body() body){
        return this.userService.remove(body,headers)
    }


}
