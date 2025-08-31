import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async getAllEvents() {
    return this.prisma.event.findMany({
      orderBy: { date: 'asc' },
    });
  }

  async createEvent(userId: string, data: { title: string; description: string; date: Date }) {
    return this.prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        organizerId: Number(userId),
      },
    });
  }

  async registerUser(userId: string, eventId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: Number(eventId) },
    });

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    return this.prisma.event.update({
      where: { id: Number(eventId) },
      data: {
        participants: {
          connect: { id: Number(userId) },
        },
      },
      include: {
      participants: true, 
    },
    });
  }
}
