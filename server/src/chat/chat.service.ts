import { ConflictException, Injectable } from '@nestjs/common';
import { ChatUserDTO } from './dto/create-chat.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class ChatService {
  async update(id: string, data: any) {
    const chat = await this.prismaService.chatUsers.update({
      where: { chatId: id },
      data: data,
    });
    throw new Error('Method not implemented.');
  }

  constructor(private readonly prismaService: PrismaService) {}
  async create(chatUserDto: any) {
    const { users } = chatUserDto;
    const chatIDv = chatUserDto.user.id + users[0];
    const isExist = await this.prismaService.chatUsers.findUnique({
      where: { chatId: chatIDv },
    });
    if (isExist) {
      const chat: any = await this.prismaService.chatUsers.findUnique({
        where: {
          chatId: chatUserDto.user.id + chatUserDto.users[0],
        },
      });
      const user = await this.prismaService.user.findUnique({
        where: {
          id: chatUserDto.users[0],
        },
      });
      chat.user = user;
      return { chat };
    }
    const chat = await this.prismaService.chatUsers.create({
      data: {
        users: [chatUserDto.user.id, users[0]],
        chatId: chatIDv,
        isDeleted: false,
        isRead: true,
        unread: 0,
        lastmessage: {
          message: '',
          date: new Date(),
        },
      },
    });
    return { chat };
  }

  async findAll(body: any) {
    const chat: any = await this.prismaService.chatUsers.findMany({
      where: {
        users: {
          has: body.user.id,
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    try {
      await Promise.all(
        chat.map(async (chatData: { users: any[] }, index: string | number) => {
          const user = await this.prismaService.user.findUnique({
            where: {
              id: chatData.users.find((id: any) => id !== body.user.id),
            },
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
              status: true,
            },
          });
          chat[index].user = user;
          return user;
        }),
      );
    } catch (error) {
      console.log(error);
    }

    return { chat };
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
