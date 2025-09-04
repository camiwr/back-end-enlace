import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto, organizerId: number) {
    // Remove organizerId from createEventDto to avoid Prisma relation error
    const { organizerId: _organizerId, ...eventData } = createEventDto;
    return this.prisma.event.create({
      data: {
        ...eventData,
        date: new Date(createEventDto.date),
        organizer: { connect: { id: organizerId } },
      },
    });
  }

  findAll() {
    return this.prisma.event.findMany({
      include: {
        organizer: { select: { name: true } },
        _count: {
          select: { participants: true },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.event.findUnique({
      where: { id },
      include: {
        organizer: { select: { name: true } },
        participants: true,
      },
    });
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  remove(id: number) {
    return this.prisma.event.delete({
      where: { id },
    });
  }

  async joinEvent(eventId: number, userId: number) {
    await this.prisma.event.update({
      where: { id: eventId },
      data: {
        participants: { connect: { id: userId } },
      },
    });
    return { message: 'Participação confirmada com sucesso.' };
  }

  async leaveEvent(eventId: number, userId: number) {
    await this.prisma.event.update({
      where: { id: eventId },
      data: {
        participants: { disconnect: { id: userId } },
      },
    });
    return { message: 'Saída do evento com sucesso.' };
  }
}