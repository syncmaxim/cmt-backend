import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
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
    let user = await jwt.decode(token.split('Bearer ')[1]);
    const newEvent = new this.eventModel({...event, userId: user.id});
    await this.usersService.updateEvents(user.id, newEvent._id);
    return await newEvent.save();
  }

  async update(id: string, event: IEvent): Promise<IEvent> {
    return this.eventModel.findOneAndUpdate({_id: id}, event, {new: true});
  }

  async updateAttenders(id: string, token): Promise<IEvent> {
    let user = await jwt.decode(token.split('Bearer ')[1]);
    return this.eventModel.findOneAndUpdate({_id: id}, {
      $push: {
        attenders:
            {
              id: user.id
            }
      }
    }, {new: true});
  }

  async delete(id: string): Promise<IEvent> {
    return this.eventModel.findOneAndDelete({_id: id});
  }

  async deleteAll(): Promise<any> {
    return this.eventModel.deleteMany({});
  }
}
