import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from "../../shared/types/user.interface";
import { User } from "./schemas/user.model";
import { ReturnModelType } from "@typegoose/typegoose";


@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: ReturnModelType<typeof User>) {}

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
