import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from './auth.service';
import { UserSchema } from "../users/schemas/user.schema";
import { AuthController } from "./auth.controller";
import { UsersService } from "../users/users.service";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({ secret: process.env.SECRET_KEY })
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, ConfigService]
})
export class AuthModule {
  constructor(private readonly configService: ConfigService) {}
}
