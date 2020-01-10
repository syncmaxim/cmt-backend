import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model } from "mongoose";
import { UserInterface } from "./interfaces/user.interface";


@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserInterface>) {}

    async findAll(): Promise<UserInterface[]> {
        return this.userModel.find();
    }

    async findOneById(id: string): Promise<UserInterface> {
        return this.userModel.findOne({_id: id});
    }

    async findOneByEmail(email: string): Promise<UserInterface> {
        return this.userModel.findOne({email: email});
    }

}
