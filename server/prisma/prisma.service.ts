import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Database connected');
    } catch (error) {
      console.error('Error connecting to database:', error);
      throw error; // Propagate error for proper handling
    }
  }

  async onClose() {
    await this.$disconnect();
    console.log('Database disconnected');
  }
}
