import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { IEvent } from "../../shared/types/event.interface";
import { EventsService } from "./events.service";

@Controller('api/events')
export class EventsController {

  constructor(private readonly eventsService: EventsService) {}

  @Get()
  getEvents(): Promise<IEvent[]> {
    return this.eventsService.findAll()
  }

  @Get(':id')
  getEvent(@Param('id') id: string): Promise<IEvent> {
    return this.eventsService.findOneById(id)
  }

  @Post()
  createEvent(@Body() event: IEvent): Promise<IEvent> {
    return this.eventsService.create(event)
  }

  @Put(':id')
  updateEvent(@Param('id') id: string, @Body() event: IEvent): Promise<IEvent> {
    return this.eventsService.update(id, event)
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string): Promise<IEvent> {
    return this.eventsService.delete(id)
  }

  // TODO: add token for delete all or other permission

  @Delete('delete/all')
  deleteAllEvents(): Promise<IEvent> {
    return this.eventsService.deleteAll()
  }
}
