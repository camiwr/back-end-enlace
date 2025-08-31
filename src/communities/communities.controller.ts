import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommunitiesService } from './communities.service';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Get()
  async getAllCommunities() {
    return this.communitiesService.getAllCommunities();
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createCommunity(@Request() req, @Body() data) {
    return this.communitiesService.createCommunity(req.user.id, data);
  }

  @Post(':id/join')
  @UseGuards(JwtAuthGuard)
  async joinCommunity(@Request() req, @Param('id') communityId: string) {
    return this.communitiesService.joinCommunity(req.user.id, communityId);
  }

  @Post(':id/leave')
  @UseGuards(JwtAuthGuard)
  async leaveCommunity(@Request() req, @Param('id') communityId: string) {
    return this.communitiesService.leaveCommunity(req.user.id, communityId);
  }
}
