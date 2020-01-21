import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IEvent } from "./types/event.interface";

@Injectable()
export class EventsService {
  constructor(@InjectModel('Event') private readonly eventModel: Model<IEvent>) {}

  async findAll(): Promise<IEvent[]> {
    return this.eventModel.find();
  }

  async findOneById(id: string): Promise<IEvent> {
    return this.eventModel.findOne({_id: id});
  }

  async create(event: IEvent): Promise<IEvent> {
    const newEvent = new this.eventModel(event);
    return await newEvent.save();
  }

  async update(id: string, event: IEvent): Promise<IEvent> {
    return this.eventModel.findOneAndUpdate({_id: id}, event, {new: true});
  }

  async delete(id: string): Promise<IEvent> {
    return this.eventModel.findOneAndDelete({_id: id});
  }

  async deleteAll(): Promise<any> {
    return this.eventModel.deleteMany({});
  }
}
