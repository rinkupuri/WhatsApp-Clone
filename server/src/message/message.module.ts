import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [MessageController],
  providers: [MessageService, PrismaService, JwtService],
})
export class MessageModule {}
