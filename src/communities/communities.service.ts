import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CommunitiesService {
  constructor(private prisma: PrismaService) {}

  async getAllCommunities() {
    return this.prisma.community.findMany();
  }

  async createCommunity(userId: string, data: { name: string; description: string }) {
    return this.prisma.community.create({
      data: {
        name: data.name,
        description: data.description,
        ownerId: userId,
      },
    });
  }

  async joinCommunity(userId: string, communityId: string) {
    return this.prisma.community.update({
      where: { id: communityId },
      data: { members: { connect: { id: userId } } },
    });
  }
}
