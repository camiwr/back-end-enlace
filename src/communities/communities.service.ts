import { Injectable } from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CommunitiesService {
  constructor(private prisma: PrismaService) {}

  async create(createCommunityDto: CreateCommunityDto, ownerId: number) {
    console.log('Communities Service - Método create chamado.');
    console.log('Communities Service - ownerId recebido:', ownerId); // <-- LOG AQUI

    return this.prisma.community.create({
      data: {
        name: createCommunityDto.name,
        description: createCommunityDto.description,
        owner: { connect: { id: ownerId } },
      },
    });
  }
  
  // Método para buscar todas as comunidades
  async findAll() {
    return this.prisma.community.findMany({
      include: {
        _count: {
          select: { members: true },
        },
        owner: {
          select: { name: true },
        }
      },
    });
  }

  // Método para buscar uma comunidade por ID
  async findOne(id: number) {
    return this.prisma.community.findUnique({
      where: { id },
      include: {
        members: true,
        owner: { select: { name: true } },
      },
    });
  }

  // Método para atualizar uma comunidade (para o painel de admin)
  async update(id: number, updateCommunityDto: UpdateCommunityDto) {
    return this.prisma.community.update({
      where: { id },
      data: updateCommunityDto,
    });
  }

  // Método para remover uma comunidade (para o painel de admin)
  async remove(id: number) {
    return this.prisma.community.delete({
      where: { id },
    });
  }

  // Método para um usuário entrar em uma comunidade
  async joinCommunity(communityId: number, userId: number) {
    await this.prisma.community.update({
      where: { id: communityId },
      data: {
        members: {
          connect: { id: userId },
        },
      },
    });
    return { message: 'Participação confirmada com sucesso.' };
  }

  // Método para um usuário sair de uma comunidade
  async leaveCommunity(communityId: number, userId: number) {
    await this.prisma.community.update({
      where: { id: communityId },
      data: {
        members: {
          disconnect: { id: userId },
        },
      },
    });
    return { message: 'Saída da comunidade com sucesso.' };
  }
}