import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from './auth.service';
import { UserSchema } from "../users/schemas/user.schema";
import { AuthController } from "./auth.controller";
import { UsersService } from "../users/users.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  exports: [AuthService]
})
export class AuthModule {}
