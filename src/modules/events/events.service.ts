import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {mongoose, ReturnModelType} from '@typegoose/typegoose';
import * as jwt from 'jsonwebtoken';
import { IEvent } from '../../shared/types/event.interface';
import { Event } from './models/event.model';
import {UsersService} from '../users/users.service';

@Injectable()
export class EventsService {
  constructor(@InjectModel('Event') private readonly eventModel: ReturnModelType<typeof Event>, private usersService: UsersService) {}

  async findAll(): Promise<IEvent[]> {
    return this.eventModel.find();
  }

  async findOneById(id: string): Promise<IEvent> {
    return this.eventModel.findOne({_id: id});
  }

  async create(event: IEvent, token): Promise<IEvent> {
    const user = await jwt.decode(token.split('Bearer ')[1]);
    const newEvent = new this.eventModel({...event, userId: new mongoose.Types.ObjectId(user.id)});
    await this.usersService.updateEvents(user.id, newEvent._id);
    return await newEvent.save();
  }

  async update(id: string, event: IEvent): Promise<IEvent> {
    return this.eventModel.findOneAndUpdate({_id: id}, event, {new: true});
  }

  async updateAttenders(id: string, token: string, status: boolean): Promise<IEvent> {
    const user = await jwt.decode(token.split('Bearer ')[1]);
    let updatedEvent;
    if (status) {
      updatedEvent = await this.eventModel.findOneAndUpdate({_id: id}, {
        $push: {
          attenders: new mongoose.Types.ObjectId(user.id),
        },
      }, {new: true});
      await this.usersService.updateAttends(user.id, updatedEvent._id, status);
    } else {
      updatedEvent = await this.eventModel.findOneAndUpdate({_id: id}, {
        $pull: {
          attenders: new mongoose.Types.ObjectId(user.id),
        },
      }, {new: true});
      await this.usersService.updateAttends(user.id, updatedEvent._id, status);
    }
    return updatedEvent;
  }

  async delete(id: string): Promise<IEvent> {
    return this.eventModel.findOneAndDelete({_id: id});
  }
}
