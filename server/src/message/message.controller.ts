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
  Query,
  Req,
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
  findAll(@Param() chatId, @Query('page') page: number, @Req() req: any) {
    return this.messageService.findAll(chatId.chatId, page, req);
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
    @Query('status') status: string,
  ) {
    console.log(updateMessageDto, param);
    return this.messageService.updateAsRead(updateMessageDto, {
      chatId: param.chatId,
      status,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
