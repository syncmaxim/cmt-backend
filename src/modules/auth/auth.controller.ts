import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ILoggedUser } from "./types/logged-user.interface";
import { IUser } from "../users/types/user.interface";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() createUserDto: IUser): Promise<ILoggedUser> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  loginUser(@Body() createUserDto: IUser): Promise<ILoggedUser> {
    return this.authService.login(createUserDto);
  }
}
