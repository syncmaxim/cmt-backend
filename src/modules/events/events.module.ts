import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypegooseModule } from "nestjs-typegoose";
import { Event } from "./schemas/event.model";

@Module({
  imports: [
    TypegooseModule.forFeature([Event])
  ],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
