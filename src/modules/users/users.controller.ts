import {Controller, Get, Post, Put, Delete, Param} from '@nestjs/common';
import {UsersService} from "./users.service";
import {UserInterface} from "./interfaces/user.interface";

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers(): Promise<UserInterface[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    getUser(@Param() id: string): Promise<UserInterface> {
        return this.usersService.findOneById(id);
    }
}
