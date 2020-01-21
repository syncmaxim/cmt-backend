import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcryptjs';
import { Model } from "mongoose";
import * as jwt from 'jsonwebtoken';
import { IUser } from "../users/types/user.interface";
import { UsersService } from "../users/users.service";
import { ILoggedUser } from "./types/logged-user.interface";
import errorMessage from '../../shared/helpers/error-messages';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    private readonly usersService: UsersService) {
  }

  emailValidate = value => value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(value); // unexpected behavior: in frontend returned opposite test gives true, but in backend it gives sometimes false.

  async register(user: IUser): Promise<ILoggedUser> {
    if (!this.emailValidate(user.email)) {
      throw new HttpException(errorMessage.authorization.ERROR_EMAIL_VALIDATION, 403);
    }

    const searchedUser = await this.usersService.findOneByEmail(user.email);

    console.log(searchedUser);

    if (searchedUser) {
      throw new HttpException(errorMessage.authorization.USER_EXISTS, 403);
    }

    const hash: string = await bcrypt.hash(user.password, +process.env.ROUNDS);
    const newUser = new this.userModel({...user, password: hash});
    const newUserData = await newUser.save();
    const token: string = await jwt.sign({id: newUserData._id, email: newUserData.email}, process.env.SECRET_KEY);

    return {id: newUserData._id, email: newUserData.email, token};
  }

  async login(user: IUser): Promise<ILoggedUser> {
    let searchedUser: IUser;

    this.emailValidate(user.email) ? searchedUser = await this.usersService.findOneByEmail(user.email) : searchedUser = undefined;

    if (!searchedUser) {
      throw new HttpException(errorMessage.authorization.NO_USER, 403);
    }

    const isPasswordValid: boolean = await bcrypt.compare(user.password, searchedUser.password);

    if (!isPasswordValid) {
        throw new HttpException(errorMessage.authorization.PASS_NOT_MATCH, 403);
      }

      const token: string = await jwt.sign({id: searchedUser.id, email: searchedUser.email}, process.env.SECRET_KEY);
      return { id: searchedUser.id, email: searchedUser.email, token};
  }
}
