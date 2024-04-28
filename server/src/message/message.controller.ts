import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthGuard } from 'src/Guards/AuthGuard';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get('get/:chatId')
  @UseGuards(AuthGuard)
  findAll(@Param() chatId) {
    return this.messageService.findAll(chatId.chatId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }
  @Put('read/:chatId')
  @UseGuards(AuthGuard)
  updateAsRead(
    @Body() updateMessageDto: CreateMessageDto,
    @Param() param: { chatId: string },
  ) {
    console.log(updateMessageDto, param.chatId);
    return this.messageService.updateAsRead(updateMessageDto, param.chatId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
