import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import { Request } from 'express';
import { IEvent } from '../../shared/types/event.interface';
import { EventsService } from './events.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/events')
export class EventsController {

  constructor(private readonly eventsService: EventsService) {}

  @Get()
  getEvents(): Promise<IEvent[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  getEvent(@Param('id') id: string): Promise<IEvent> {
    return this.eventsService.findOneById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createEvent(@Body() event: IEvent, @Req() request: Request): Promise<IEvent> {
    return this.eventsService.create(event, request.header('Authorization'));
  }

  @Put(':id')
  updateEvent(@Param('id') id: string, @Body() event: IEvent): Promise<IEvent> {
    return this.eventsService.update(id, event);
  }

  @Put('/attend/:id')
  @UseGuards(AuthGuard)
  attendEvent(@Param('id') id: string, @Req() request: Request): Promise<IEvent> {
    return this.eventsService.updateAttenders(id, request.header('Authorization'));
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string): Promise<IEvent> {
    return this.eventsService.delete(id);
  }
}
