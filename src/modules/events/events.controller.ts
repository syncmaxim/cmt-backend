import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import { Request } from 'express';
import { IEvent } from '../../shared/types/event.interface';
import { EventsService } from './events.service';
import { AuthGuard } from '../auth/auth.guard';
import {Event} from './models/event.model';

@Controller('api/events')
export class EventsController {

  constructor(private readonly eventsService: EventsService) {}

  @Get()
  getEvents(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  getEvent(@Param('id') id: string): Promise<Event> {
    return this.eventsService.findOneById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createEvent(@Body() event: IEvent, @Req() request: Request): Promise<Event> {
    return this.eventsService.create(event, request.header('Authorization'));
  }

  @Put(':id')
  updateEvent(@Param('id') id: string, @Body() event: IEvent): Promise<Event> {
    return this.eventsService.update(id, event);
  }

  @Put('/attend/:id')
  @UseGuards(AuthGuard)
  attendEvent(@Param('id') id: string, @Req() request: Request): Promise<Event> {
    return this.eventsService.updateAttenders(id, request.header('Authorization'), true);
  }

  @Put('/attend/cancel/:id')
  @UseGuards(AuthGuard)
  cancelAttendEvent(@Param('id') id: string, @Req() request: Request): Promise<Event> {
    return this.eventsService.updateAttenders(id, request.header('Authorization'), false);
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string): Promise<Event> {
    return this.eventsService.delete(id);
  }
}
