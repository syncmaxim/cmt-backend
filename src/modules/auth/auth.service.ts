import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ReturnModelType } from '@typegoose/typegoose';
import { IUser } from '../../shared/types/user.interface';
import { UsersService } from '../users/users.service';
import { ILogged } from '../../shared/types/logged.interface';
import errorMessage from '../../shared/helpers/error-messages';
import { User } from '../users/models/user.model';
import { ISignUp } from '../../shared/types/sign_up.interface';
import { ISignIn } from '../../shared/types/sign_in.interface';
import { emailValidate } from '../../shared/helpers/emailValidate';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel('User') private readonly userModel: ReturnModelType<typeof User>,
    private readonly usersService: UsersService) {
  }

  async register(user: ISignUp): Promise<ILogged> {
    if (!emailValidate(user.email)) {
      throw new HttpException(errorMessage.authorization.ERROR_EMAIL_VALIDATION, 401);
    }

    const searchedUser = await this.usersService.findOneByEmail(user.email);

    if (searchedUser) {
      throw new HttpException(errorMessage.authorization.USER_EXISTS, 401);
    }

    const hash: string = await bcrypt.hash(user.password, +process.env.ROUNDS);
    const newUser = new this.userModel({...user, password: hash});
    const newUserData = await newUser.save();
    const token: string = await jwt.sign({id: newUserData._id, email: newUserData.email}, process.env.SECRET_KEY);

    return {id: newUserData._id, token};
  }

  async login(user: ISignIn): Promise<ILogged> {
    let searchedUser: IUser;

    emailValidate(user.email) ? searchedUser = await this.usersService.findOneByEmail(user.email) : searchedUser = undefined;

    if (!searchedUser) {
      throw new HttpException(errorMessage.authorization.NO_USER, 401);
    }

    const isPasswordValid: boolean = await bcrypt.compare(user.password, searchedUser.password);

    if (!isPasswordValid) {
        throw new HttpException(errorMessage.authorization.PASS_NOT_MATCH, 401);
      }

    const token: string = await jwt.sign({id: searchedUser.id, email: searchedUser.email}, process.env.SECRET_KEY);
    return { id: searchedUser.id, token};
  }
}
