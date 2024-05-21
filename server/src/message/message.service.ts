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
  async findAll(
    chatId: string,
    page: number,
    req: { body: { user: { id: string } } },
  ) {
    try {
      page -= 1;
      const chats: any = await this.prisma.message.findMany({
        where: {
          chatId,
          NOT: {
            Deleted: {
              has: req.body.user.id,
            },
          },
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
          NOT: {
            Deleted: {
              has: req.body.user.id,
            },
          },
        },
      });
      let meta = {
        total: 0,
        page: 0,
        limit: 0,
        pages: 0,
      };
      meta.total = totalResult;
      meta.page = page + 1;
      meta.limit = 50;
      meta.pages = Math.ceil(totalResult / 50);
      return { chats: chats.reverse(), meta };
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
