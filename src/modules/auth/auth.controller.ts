import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LoggedUserInterface } from "./intefraces/logged-user.interface";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto): Promise<LoggedUserInterface> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  loginUser(@Body() createUserDto: CreateUserDto): Promise<LoggedUserInterface> {
    return this.authService.login(createUserDto);
  }
}
