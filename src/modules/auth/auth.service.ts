import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { ReturnModelType } from '@typegoose/typegoose';
import { ILogged } from '../../shared/types/logged.interface';
import errorMessage from '../../shared/helpers/error-messages';
import { User } from '../users/models/user.model';
import { ISignUp } from '../../shared/types/sign_up.interface';
import { ISignIn } from '../../shared/types/sign_in.interface';
import { emailValidate } from '../../shared/helpers/emailValidate';
import {signToken} from '../../shared/helpers/signToken';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel('User') private readonly userModel: ReturnModelType<typeof User>) {
  }

  async register(user: ISignUp): Promise<ILogged> {
    if (!emailValidate(user.email)) {
      throw new HttpException(errorMessage.authorization.ERROR_EMAIL_VALIDATION, 401);
    }

    const searchedUser = await this.userModel.findOne({email: user.email}, { events: 0, eventsToAttend: 0 });

    if (searchedUser) {
      throw new HttpException(errorMessage.authorization.USER_EXISTS, 401);
    }

    const hash: string = await bcrypt.hash(user.password, +process.env.ROUNDS);
    const newUser = new this.userModel({...user, password: hash});
    const newUserData = await newUser.save();
    const token = await signToken({_id: newUserData._id, email: newUserData.email});

    return {_id: newUserData._id, token};
  }

  async login(user: ISignIn): Promise<ILogged> {
    const searchedUser = await this.userModel.findOne({email: user.email}, { events: 0, eventsToAttend: 0 });

    if (!emailValidate(user.email) && searchedUser === null) {
      throw new HttpException(errorMessage.authorization.NO_USER, 401);
    }

    const isPasswordValid: boolean = await bcrypt.compare(user.password, searchedUser.password);

    if (!isPasswordValid) {
        throw new HttpException(errorMessage.authorization.PASS_NOT_MATCH, 401);
      }

    const token = await signToken({_id: searchedUser._id, email: searchedUser.email});
    return {_id: searchedUser._id, token};
  }
}
