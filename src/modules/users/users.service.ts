import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../../shared/types/user.interface';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: ReturnModelType<typeof User>) {}

    async findAll(): Promise<IUser[]> {
        return this.userModel.find();
    }

    async getUserInfo(token): Promise<{id: string, email: string }> {
        const data = await jwt.decode(token.split('Bearer ')[1]);
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
