import {Controller, Get, Post, Put, Delete, Param, UseGuards, Body, Req} from '@nestjs/common';
import {UsersService} from './users.service';
import {IUser} from '../../shared/types/user.interface';
import { AuthGuard } from '../auth/auth.guard';
import {Request} from 'express';
import {IChangePassword} from '../../shared/types/change-password.interface';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers(): Promise<IUser[]> {
        return this.usersService.findAll();
    }

    @Get('user-info')
    @UseGuards(AuthGuard)
    getUserInfo(@Req() request: Request): Promise<{id: string, email: string }> {
        return this.usersService.getUserInfo(request.header('Authorization'));
    }

    @Get(':id')
    getUser(@Param() id: string): Promise<IUser> {
        return this.usersService.findOneById(id);
    }

    @Post()
    createUser(@Body() user: IUser): Promise<IUser> {
        return this.usersService.create(user);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() user: IUser): Promise<IUser> {
        return this.usersService.update(id, user);
    }

    @Put('change-email')
    @UseGuards(AuthGuard)
    changeUserEmail(@Req() request: Request, @Body() email: {email: string}): Promise<IUser> {
        return this.usersService.updateEmail(request.header('Authorization'), email);
    }

    @Put('change-password')
    @UseGuards(AuthGuard)
    changeUserPassword(@Req() request: Request, @Body() passwords: IChangePassword): Promise<IUser> {
        console.log(request);
        console.log(passwords);
        return this.usersService.updatePassword(request.header('Authorization'), passwords);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string): Promise<IUser> {
        return this.usersService.delete(id);
    }
}
