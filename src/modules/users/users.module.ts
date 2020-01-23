import { Module } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";
import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import { User } from "./schemas/user.model";

@Module({
    imports: [TypegooseModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
