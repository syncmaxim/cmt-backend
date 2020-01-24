import { Controller, Get, Post, Put, Delete, Param, UseGuards, Body } from "@nestjs/common";
import {UsersService} from "./users.service";
import {IUser} from "../../shared/types/user.interface";
import { AuthGuard } from "../auth/auth.guard";

@Controller('api/users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers(): Promise<IUser[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    getUser(@Param() id: string): Promise<IUser> {
        return this.usersService.findOneById(id);
    }

    @Post()
    createUser(@Body() user: IUser): Promise<IUser> {
        return this.usersService.create(user)
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() user: IUser): Promise<IUser> {
        return this.usersService.update(id, user)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string): Promise<IUser> {
        return this.usersService.delete(id)
    }

    // TODO: add token for delete all or other permission

    @Delete('delete/all')
    deleteAllUsers(): Promise<IUser> {
        return this.usersService.deleteAll()
    }
}
