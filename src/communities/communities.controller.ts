import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin/admin.guard';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Get()
  findAll() {
    return this.communitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communitiesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':communityId/join')
  joinCommunity(@Param('communityId') communityId: string, @Request() req) {
    return this.communitiesService.joinCommunity(+communityId, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':communityId/leave')
  leaveCommunity(@Param('communityId') communityId: string, @Request() req) {
    return this.communitiesService.leaveCommunity(+communityId, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCommunityDto: CreateCommunityDto, @Request() req) {
    console.log('Communities Controller - Requisição POST para criar comunidade recebida.');
    console.log('Communities Controller - Conteúdo de req.user:', req.user); // <-- LOG AQUI
    console.log('Communities Controller - userId a ser enviado:', req.user.userId); // <-- LOG AQUI
    return this.communitiesService.create(createCommunityDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommunityDto: UpdateCommunityDto) {
    return this.communitiesService.update(+id, updateCommunityDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communitiesService.remove(+id);
  }
}