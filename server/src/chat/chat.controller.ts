import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatUserDTO } from './dto/create-chat.dto';
import { AuthGuard } from 'src/Guards/AuthGuard';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly prismaServive: PrismaService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async create(@Body() chatUserDto: any) {
    return this.chatService.create(chatUserDto);
  }

  @Get('get')
  @UseGuards(AuthGuard)
  findAll(@Body() body: any, @Req() req: any) {
    return this.chatService.findAll(body, req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return '';
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @Req() req) {
    return this.chatService.remove(id, req);
  }
}
