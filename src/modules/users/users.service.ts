import {HttpException, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import * as bcrypt from 'bcryptjs';
import { IUser } from '../../shared/types/user.interface';
import { User } from './models/user.model';
import {decodeToken} from '../../shared/helpers/decodeToken';
import {IChangePassword} from '../../shared/types/change-password.interface';
import errorMessage from '../../shared/helpers/error-messages';
import {signToken} from '../../shared/helpers/signToken';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: ReturnModelType<typeof User>) {}

    async findAll(): Promise<User[]> {
        return this.userModel.find();
    }

    async getUserInfo(token): Promise<{_id: string, email: string }> {
        const data = await decodeToken(token);
        return {_id: data._id, email: data.email };
    }

    async findOneById(id: string): Promise<User> {
        return this.userModel.findOne({_id: id});
    }

    async create(user: IUser): Promise<User> {
        const newUser = new this.userModel(user);
        return await newUser.save();
    }

    async update(id: string, event: IUser): Promise<User> {
        return this.userModel.findOneAndUpdate({_id: id}, event, {new: true});
    }

    async updateEmail(token: string, email: {email: string}): Promise<{status: boolean, message: string, token?: string}> {
        const data = await decodeToken(token);
        const searchedUser = await this.userModel.findOne({email: email.email});

        if (searchedUser !== null) {
            throw new HttpException(errorMessage.email.REPEAT_INCORRECT, 400);
        }

        try {
            const updatedUser = await this.userModel.findOneAndUpdate({_id: data._id}, email, {new: true});
            const updToken = await signToken({_id: updatedUser.id, email: updatedUser.email});
            return { status: true, message: 'Email successfully changed', token: updToken };
        } catch (e) {
            return { status: false, message: e };
        }

    }

    async updatePassword(token: string, passwords: IChangePassword): Promise<{status: boolean, message: string}> {

        if (passwords.newPassword !== passwords.confirmNewPassword) {
            throw new HttpException(errorMessage.password.REPEAT_INCORRECT, 400);
        }

        const data = await decodeToken(token);
        const searchedUser = await this.userModel.findOne({_id: data._id});
        const isPasswordValid: boolean = await bcrypt.compare(passwords.currentPassword, searchedUser.password);

        if (!isPasswordValid) {
            throw new HttpException(errorMessage.authorization.PASS_NOT_MATCH, 400);
        }

        const hash: string = await bcrypt.hash(passwords.newPassword, +process.env.ROUNDS);

        try {
            await this.userModel.findOneAndUpdate({_id: data._id}, { password: hash });
            return { status: true, message: 'Password successfully changed' };
        } catch (e) {
            return { status: false, message: e };
        }
    }

    async delete(id: string): Promise<User> {
        return this.userModel.findOneAndDelete({_id: id});
    }

    async updateEvents(_id: string, eventId: string): Promise<User> {
        return this.userModel.findOneAndUpdate({_id}, {
            $push: {
                events: new mongoose.Types.ObjectId(eventId),
            },
        }, {new: true});
    }

    async updateAttends(id: string, eventId: string, status: boolean): Promise<User> { // TODO: DEBUG FOR UPDATING MODEL
        if (status) {
            return this.userModel.findOneAndUpdate({_id: id}, {
                $push: {
                    eventsToAttend: eventId,
                },
            });
        } else {
            return this.userModel.findOneAndUpdate({_id: id}, {
                $pull: {
                    eventsToAttend: eventId,
                },
            });
        }
    }
}
