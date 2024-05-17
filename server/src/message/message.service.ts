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
  async findAll(chatId: string, page: number) {
    try {
      page -= 1;
      console.log(page);
      const chats: any = await this.prisma.message.findMany({
        where: {
          chatId,
        },
        skip: page * 50,
        take: 50,
        orderBy: {
          createdAt: 'desc',
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
      const totalResult = await this.prisma.message.count({
        where: {
          chatId,
        },
      });
      chats.total = totalResult;
      chats.page = page + 1;
      chats.limit = 50;
      chats.pages = Math.ceil(totalResult / 50);
      console.log(chats);
      return chats.reverse();
    } catch (e) {
      console.log(e);
    }
  }
  // mark all message as read after chat open
  async updateAsRead(
    body: any,
    recivedData: { chatId: string; status: string },
  ) {
    const { user } = body;
    const chatId = recivedData.chatId;
    const status = recivedData.status;
    const data = {
      isRead: status === 'Read' ? true : false,
      status,
    };
    const where =
      status === 'Read'
        ? {
            chatId: chatId,
            receiverId: user.id,
          }
        : {
            id: chatId,
            receiverId: user.id,
          };
    try {
      const messages = await this.prisma.message.updateMany({
        where,

        data,
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
