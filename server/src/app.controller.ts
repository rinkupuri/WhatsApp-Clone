import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { PrismaService } from 'prisma/prisma.service';
import { AuthGuard } from './Guards/AuthGuard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@Body() body: User): User {
    return body;
  }
}
