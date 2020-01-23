import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ILogged } from "../../shared/types/logged.interface";
import { ISignIn } from "../../shared/types/sign_in.interface";
import { ISignUp } from "../../shared/types/sign_up.interface";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() user: ISignUp): Promise<ILogged> {
    return this.authService.register(user);
  }

  @Post('login')
  loginUser(@Body() user: ISignIn): Promise<ILogged> {
    return this.authService.login(user);
  }
}
