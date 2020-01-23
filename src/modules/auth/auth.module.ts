import { Module } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";
import { AuthService } from './auth.service';
import { AuthController } from "./auth.controller";
import { UsersService } from "../users/users.service";
import { User } from "../users/schemas/user.model";

@Module({
  imports: [
    TypegooseModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  exports: [AuthService]
})
export class AuthModule {}
