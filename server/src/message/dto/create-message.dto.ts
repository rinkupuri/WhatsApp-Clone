import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateMessageDto {
  @IsString()
  receiverId: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  chatId: string;
}
