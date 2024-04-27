import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import * as cors from 'cors';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { ErrorHandler } from './Errors/ErrorHandler';
import { AuthGuard } from './Guards/AuthGuard';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [UsersModule, ChatModule, MessageModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    JwtService,
    { provide: APP_FILTER, useClass: ErrorHandler },
    { provide: APP_FILTER, useClass: AuthGuard },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cors({
          origin: 'http://localhost:3000',
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          credentials: true,
        }),
      )
      .forRoutes('*');
  }
}
