import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { EventInterface } from "./interfaces/event.interface";
import { CreateEventDto } from "./dto/create-event.dto";
import { EventsService } from "./events.service";

@Controller('api/events')
export class EventsController {

  constructor(private readonly eventsService: EventsService) {}

  @Get()
  getEvents(): Promise<EventInterface[]> {
    return this.eventsService.findAll()
  }

  @Get(':id')
  getEvent(@Param('id') id: string): Promise<EventInterface> {
    return this.eventsService.findOneById(id)
  }

  @Post()
  createEvent(@Body() createEventDto: CreateEventDto): Promise<EventInterface> {
    console.log(createEventDto);
    return this.eventsService.create(createEventDto)
  }

  @Put(':id')
  updateEvent(@Param('id') id: string, @Body() createEventDto: CreateEventDto): Promise<EventInterface> {
    return this.eventsService.update(id, createEventDto)
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string): Promise<EventInterface> {
    return this.eventsService.delete(id)
  }

  // TODO: add token for delete all or other permission

  @Delete('delete/all')
  deleteAllEvents(): Promise<EventInterface> {
    return this.eventsService.deleteAll()
  }
}
