import { ConflictException, Injectable } from '@nestjs/common';
import { ChatUserDTO } from './dto/create-chat.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ChatService {
  async update(id: string) {
    const chat = await this.prismaService.chatUsers.findUnique({
      where: { chatId: id },
    });
    throw new Error('Method not implemented.');
    u;
  }
  constructor(private readonly prismaService: PrismaService) {}
  async create(chatUserDto: ChatUserDTO) {
    const { lastmessage, users } = chatUserDto;
    const chatIDv = users[0].id + users[1].id;
    const isExist = await this.prismaService.chatUsers.findUnique({
      where: { chatId: chatIDv },
    });
    if (isExist) throw new ConflictException('Chat already exist');
    const chat = await this.prismaService.chatUsers.create({
      data: {
        users,
        chatId: users[0].id + users[1].id,
        lastmessage: {
          message: lastmessage.message,
          senderId: lastmessage.sender,
          date: new Date(),
        },
        createdAt: new Date(),
        updateAt: new Date(),
      },
    });
    return { chat };
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
