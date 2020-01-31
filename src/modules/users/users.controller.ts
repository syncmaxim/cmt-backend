import {Controller, Get, Post, Put, Delete, Param, UseGuards, Body, Req} from '@nestjs/common';
import {UsersService} from './users.service';
import {IUser} from '../../shared/types/user.interface';
import { AuthGuard } from '../auth/auth.guard';
import {Request} from 'express';

@Controller('api/users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers(): Promise<IUser[]> {
        return this.usersService.findAll();
    }

    @Get('/user-info')
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

    @Delete(':id')
    deleteUser(@Param('id') id: string): Promise<IUser> {
        return this.usersService.delete(id);
    }
}
