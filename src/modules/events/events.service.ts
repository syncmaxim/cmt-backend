import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {DocumentType, mongoose, ReturnModelType} from '@typegoose/typegoose';
import * as jwt from 'jsonwebtoken';
import { IEvent } from '../../shared/types/event.interface';
import { Event } from './models/event.model';
import {UsersService} from '../users/users.service';

@Injectable()
export class EventsService {
  constructor(@InjectModel('Event') private readonly eventModel: ReturnModelType<typeof Event>, private usersService: UsersService) {}

  async findAll(): Promise<Event[]> {
    return this.eventModel.find();
  }

  async findOneById(id: string): Promise<Event> {
    return this.eventModel.findOne({_id: id});
  }

  async create(event: IEvent, token): Promise<Event> {
    const user = await jwt.decode(token.split('Bearer ')[1]);
    const newEvent = new this.eventModel({...event, userId: new mongoose.Types.ObjectId(user.id)});
    await this.usersService.updateEvents(user._id, newEvent._id);
    return await newEvent.save();
  }

  async update(id: string, event: IEvent): Promise<Event> {
    return this.eventModel.findOneAndUpdate({_id: id}, event, {new: true});
  }

  async updateAttenders(id: string, token: string, status: boolean): Promise<Event> {
    const user = await jwt.decode(token.split('Bearer ')[1]);
    let updatedEvent: DocumentType<Event>;
    if (status) {
      updatedEvent = await this.eventModel.findOneAndUpdate({_id: id}, {
        $push: {
          attenders: new mongoose.Types.ObjectId(user._id),
        },
      }, {new: true});
    } else {
      updatedEvent = await this.eventModel.findOneAndUpdate({_id: id}, {
        $pull: {
          attenders: new mongoose.Types.ObjectId(user._id),
        },
      }, {new: true});
    }
    console.log(typeof user._id, typeof updatedEvent._id, typeof status); // updated event _id - is object ???
    await this.usersService.updateAttends(user._id, updatedEvent._id, status);
    return updatedEvent;
  }

  async delete(id: string): Promise<Event> {
    return this.eventModel.findOneAndDelete({_id: id});
  }
}
