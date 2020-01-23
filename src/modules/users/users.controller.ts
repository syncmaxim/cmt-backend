import { Controller, Get, Post, Put, Delete, Param, UseGuards } from "@nestjs/common";
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
}
