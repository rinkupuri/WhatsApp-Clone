import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  // create message here
  async create(createMessageDto: any) {
    const { chatId, message, receiverId } = createMessageDto;
    const senderId = createMessageDto.user.id as any;
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
          date: new Date(),
        },
      },
    });
    return messageData;
  }

  // find all message of a specific user
  async findAll(chatId: string) {
    try {
      const chats: any = await this.prisma.message.findMany({
        where: {
          chatId,
        },
      });
      await Promise.all(
        chats.map(
          async (chat: {
            senderId: any;
            sender: {
              id: string;
              name: string;
              email: string;
              avatar: { id: string; userId: string; url: string };
            };
          }) => {
            const user = await this.prisma.user.findUnique({
              where: {
                id: chat.senderId,
              },
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            });
            chat.sender = user;
          },
        ),
      );
      await Promise.all(
        chats.map(
          async (chat: {
            receiverId: any;
            receiver: {
              id: string;
              name: string;
              email: string;
              avatar: { id: string; userId: string; url: string };
            };
          }) => {
            const user = await this.prisma.user.findUnique({
              where: {
                id: chat.receiverId,
              },
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            });
            chat.receiver = user;
          },
        ),
      );
      return chats;
    } catch (e) {
      console.log(e);
    }
  }
  // mark all message as read after chat open
  async updateAsRead(body: any, chatId: string) {
    const { user } = body;
    try {
      const messages = await this.prisma.message.updateMany({
        where: {
          chatId: chatId,
          receiverId: user.id,
        },

        data: {
          status: 'Read',
          isRead: true,
        },
      });
    } catch (e) {
      console.log(e);
    }
    return 'Ok';
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
