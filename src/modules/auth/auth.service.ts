import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcryptjs';
import { Model } from "mongoose";
import { UserInterface } from "../users/interfaces/user.interface";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { LoggedUserInterface } from "./intefraces/logged-user.interface";
import * as jwt from 'jsonwebtoken';
import errorMessage from '../../shared/helpers/error-messages';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
    private readonly usersService: UsersService) {
  }

  emailValidation = value => value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(value); // unexpected behavior: in frontend returned opposite test gives true, but in backend it gives sometimes false.

  async register(user: CreateUserDto): Promise<LoggedUserInterface> {
    if (!this.emailValidation(user.email)) {
      throw new HttpException(errorMessage.authorization.ERROR_EMAIL_VALIDATION, 403);
    }

    const searchedUser: UserInterface = await this.usersService.findOneByEmail(user.email);

    if (!searchedUser) {
      const hash: string = await bcrypt.hash(user.password, +process.env.ROUNDS);
      const newUser: UserInterface = new this.userModel({...user, password: hash});
      const newUserData: UserInterface = await newUser.save();
      const token: string = await jwt.sign({id: newUserData._id, email: newUserData.email}, process.env.SECRET_KEY);
      return {id: newUserData._id, email: newUserData.email, token};
    } else {
      throw new HttpException(errorMessage.authorization.USER_EXISTS, 403);
    }
  }

  async login(user: CreateUserDto): Promise<LoggedUserInterface> {
    let searchedUser: UserInterface;

    this.emailValidation(user.email) ? searchedUser = await this.usersService.findOneByEmail(user.email) : searchedUser = undefined;

    if (searchedUser) {
      const isPasswordValid: boolean = await bcrypt.compare(user.password, searchedUser.password);
      if (isPasswordValid) {
        const token: string = await jwt.sign({id: searchedUser.id, email: searchedUser.email}, process.env.SECRET_KEY);
        return { id: searchedUser.id, email: searchedUser.email, token};
      } else {
        throw new HttpException(errorMessage.authorization.PASS_NOT_MATCH, 403);
      }
    } else {
      throw new HttpException(errorMessage.authorization.NO_USER, 403);
    }
  }
}
