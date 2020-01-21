import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model } from "mongoose";
import { IUser } from "./types/user.interface";


@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

    async findAll(): Promise<IUser[]> {
        return this.userModel.find();
    }

    async findOneById(id: string): Promise<IUser> {
        return this.userModel.findOne({_id: id});
    }

    async findOneByEmail(email: string): Promise<IUser> {
        return this.userModel.findOne({email: email});
    }

}
