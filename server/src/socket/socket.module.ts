import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { AuthGuard } from 'src/Guards/AuthGuard';
import { SocketGateway } from './socket.gateway';
import { ChatService } from 'src/chat/chat.service';

@Module({
  controllers: [],
  providers: [
    UsersService,
    ChatService,
    UsersService,
    PrismaService,
    JwtService,
    {
      provide: APP_FILTER,
      useClass: AuthGuard,
    },
  ],
})
export class SocketModule {}
