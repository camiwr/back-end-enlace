import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // Rota pública: lista todos os eventos
  @Get()
  getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  // Rota autenticada: cria um novo evento
  @Post('create')
  @UseGuards(JwtAuthGuard)
  createEvent(@Request() req, @Body() data: { title: string; description: string; date: Date }) {
    return this.eventsService.createEvent(req.user.id, data);
  }

  // Rota autenticada: inscreve o usuário em um evento
  @Post('register')
  @UseGuards(JwtAuthGuard)
  register(@Request() req, @Body() data: { eventId: string }) {
    return this.eventsService.registerUser(req.user.id, data.eventId);
  }
}
