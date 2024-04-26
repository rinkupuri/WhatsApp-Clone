import { User } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

class SenderDTO {
  @IsNotEmpty()
  senderId: string;
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsUrl()
  avatar: string;
}

class lastmessage {
  @IsString()
  @IsNotEmpty()
  message: string;
  @IsDate()
  date: Date;
  @IsString()
  @IsNotEmpty()
  sender: string;
}

class ReceiverDTO {
  @IsNotEmpty()
  receiverId: string;
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsUrl()
  avatar: string;
}

export class ChatUserDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  users: Array<User>;

  @IsNotEmpty()
  lastmessage: Record<string, any>;

  @IsBoolean()
  isDeleted: boolean;

  @IsBoolean()
  isRead: boolean;

  @IsInt()
  @Min(0)
  unread: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updateAt: Date;

  chatId?: string;
}

export class MessageDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  sender: Record<string, any>; // JSON object

  @IsNotEmpty()
  receiver: Record<string, any>; // JSON object

  @IsNotEmpty()
  message: Record<string, any>; // JSON object

  @IsBoolean()
  isDeleted: boolean;

  @IsBoolean()
  isRead: boolean;

  @IsInt()
  @Min(0)
  unread: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updateAt: Date;

  @IsString()
  @IsNotEmpty()
  chatId: string;
}
