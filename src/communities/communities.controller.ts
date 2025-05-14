import { Controller, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin/admin.guard';

@Controller('communities')
export class CommunitiesController {
  @Post('create')
  @UseGuards(AdminGuard)
  createCommunity() {
    return { message: 'Community created successfully!' };
  }
}