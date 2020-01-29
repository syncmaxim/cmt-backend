import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypegooseModule } from "nestjs-typegoose";
import { Event } from "./models/event.model";
import {UsersModule} from '../users/users.module';

@Module({
  imports: [
    TypegooseModule.forFeature([Event]),
    UsersModule
  ],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
