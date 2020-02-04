import {HttpException, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import * as bcrypt from 'bcryptjs';
import { IUser } from '../../shared/types/user.interface';
import { User } from './models/user.model';
import {decodeToken} from '../../shared/helpers/decodeToken';
import {IChangePassword} from '../../shared/types/change-password.interface';
import errorMessage from '../../shared/helpers/error-messages';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: ReturnModelType<typeof User>) {}

    async findAll(): Promise<IUser[]> {
        return this.userModel.find();
    }

    async getUserInfo(token): Promise<{id: string, email: string }> {
        const data = await decodeToken(token);
        return {id: data.id, email: data.email };
    }

    async findOneById(id: string): Promise<IUser> {
        return this.userModel.findOne({_id: id});
    }

    async findOneByEmail(email: string): Promise<IUser> {
        return this.userModel.findOne({email});
    }

    async create(user: IUser): Promise<IUser> {
        const newUser = new this.userModel(user);
        return await newUser.save();
    }

    async update(id: string, event: IUser): Promise<IUser> {
        return this.userModel.findOneAndUpdate({_id: id}, event, {new: true});
    }

    async updateEmail(token: string, email: {email: string}): Promise<IUser> {
        const data = await decodeToken(token);
        return this.userModel.findOneAndUpdate({_id: data.id}, email, {new: true});
    }

    async updatePassword(token: string, passwords: IChangePassword): Promise<IUser> {

        if (passwords.newPassword !== passwords.confirmNewPassword) {
            throw new HttpException(errorMessage.password.REPEAT_INCORRECT, 400);
        }

        const data = await decodeToken(token);
        const searchedUser = await this.userModel.findOne({_id: data.id});
        const isPasswordValid: boolean = await bcrypt.compare(passwords.currentPassword, searchedUser.password);

        if (!isPasswordValid) {
            throw new HttpException(errorMessage.authorization.PASS_NOT_MATCH, 400);
        }

        const hash: string = await bcrypt.hash(passwords.newPassword, +process.env.ROUNDS);

        return this.userModel.findOneAndUpdate({_id: data.id}, { password: hash }, {new: true});
    }

    async delete(id: string): Promise<IUser> {
        return this.userModel.findOneAndDelete({_id: id});
    }

    async updateEvents(id: string, eventId: string): Promise<IUser> {
        return this.userModel.findOneAndUpdate({_id: id}, {
            $push: {
                events: new mongoose.Types.ObjectId(eventId),
            },
        }, {new: true});
    }

    async updateAttends(id: string, eventId: string, status: boolean): Promise<IUser> {
        if (status) {
            return this.userModel.findOneAndUpdate({_id: id}, {
                $push: {
                    eventsToAttend: new mongoose.Types.ObjectId(eventId),
                },
            }, {new: true});
        } else {
            return this.userModel.findOneAndUpdate({_id: id}, {
                $pull: {
                    eventsToAttend: new mongoose.Types.ObjectId(eventId),
                },
            }, {new: true});
        }
    }
}
