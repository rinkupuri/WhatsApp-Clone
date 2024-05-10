import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
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
    console.log(chatUserDto);

    return this.chatService.create(chatUserDto);
  }

  @Get('get')
  @UseGuards(AuthGuard)
  findAll(@Body() body: any) {
    return this.chatService.findAll(body);
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
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
