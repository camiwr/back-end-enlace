import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommunitiesModule } from './communities/communities.module';
import { EventsModule } from './events/events.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { PrismaService } from '../prisma/prisma.service';
import { AdminRequestsController } from './admin-requests/admin-requests.controller';

@Module({
  imports: [AuthModule, UsersModule, CommunitiesModule, EventsModule, AnnouncementsModule],
  controllers: [AppController, AdminRequestsController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
