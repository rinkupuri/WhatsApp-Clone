import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { AuthGuard } from 'src/Guards/AuthGuard';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    JwtService,
    {
      provide: APP_FILTER,
      useClass: AuthGuard,
    },
  ],
})
export class UsersModule {}
