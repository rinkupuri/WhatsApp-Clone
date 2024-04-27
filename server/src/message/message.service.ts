import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMessageDto: any) {
    const { chatId, message, receiverId } = createMessageDto;
    const senderId = createMessageDto.user.id as any;
    console.log(senderId);
    const messageData = await this.prisma.message.create({
      data: {
        senderId,
        chatId,
        message,
        receiverId,
      },
    });
    await this.prisma.chatUsers.update({
      where: {
        chatId: chatId,
      },
      data: {
        lastmessage: {
          message,
        },
      },
    });
    return messageData;
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
