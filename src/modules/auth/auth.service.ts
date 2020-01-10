import { HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcryptjs';
import { Model } from "mongoose";
import { UserInterface } from "../users/interfaces/user.interface";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { LoggedUserInterface } from "./intefraces/logged-user.interface";

@Injectable()
export class AuthService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService) {
  }

  async register(user: CreateUserDto): Promise<LoggedUserInterface> {
    const hash: string = await bcrypt.hash(user.password, +process.env.ROUNDS);
    const newUser: UserInterface = new this.userModel({...user, password: hash});
    const newUserData: UserInterface = await newUser.save();
    const token: string = await this.jwtService.sign({id: newUserData._id, email: newUserData.email});
    return {id: newUserData._id, email: newUserData.email, token};
  }

  async login(user: CreateUserDto): Promise<LoggedUserInterface> {
    const searchedUser: UserInterface = await this.usersService.findOneByEmail(user.email);
    if (searchedUser) {
      const isPasswordValid: boolean = await bcrypt.compare(user.password, searchedUser.password);
      if (isPasswordValid) {
        const token: string = await this.jwtService.sign({id: searchedUser.id, email: searchedUser.email});
        return { id: searchedUser.id, email: searchedUser.email, token};
      } else {
        throw new HttpException(`Password doesn't match`, 401);
      }
    } else {
      throw new HttpException('Such user not found', 401);
    }
  }
}
