import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('users')
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return { message: 'Authenticated user access granted!', user: req.user };
  }

  @Get('my-communities')
  @UseGuards(JwtAuthGuard)
  async getMyCommunities(@Request() req) {
    const user = await this.prisma.user.findUnique({
      where: { id: req.user.id },
      include: { communityMemberships: true },
    });
    return user.communityMemberships;
  }
}
