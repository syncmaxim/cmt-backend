import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EventInterface } from "./interfaces/event.interface";
import { CreateEventDto } from "./dto/create-event.dto";

@Injectable()
export class EventsService {
  constructor(@InjectModel('Event') private readonly eventModel: Model<EventInterface>) {}

  async findAll(): Promise<EventInterface[]> {
    return this.eventModel.find();
  }

  async findOneById(id: string): Promise<EventInterface> {
    return this.eventModel.findOne({_id: id});
  }

  async create(event: CreateEventDto): Promise<EventInterface> {
    const newEvent: EventInterface = new this.eventModel(event);
    return await newEvent.save();
  }

  async update(id: string, event: CreateEventDto): Promise<EventInterface> {
    return this.eventModel.findOneAndUpdate({_id: id}, event, {new: true});
  }

  async delete(id: string): Promise<EventInterface> {
    return this.eventModel.findOneAndDelete({_id: id});
  }
}
