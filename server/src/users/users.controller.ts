import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  ExecutionContext,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterRespopnce } from './types/user.types';
import { SendToken } from 'utils/sendToken';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/Guards/AuthGuard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}
  @Post('create')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegisterRespopnce> {
    const user = await this.usersService.register(createUserDto);
    const genToken = new SendToken(this.jwtService);
    const token = await genToken.sendToken(user);
    return { user, token };
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.usersService.loginUser(createUserDto);
    const genToken = new SendToken(this.jwtService);
    const token = await genToken.sendToken(user);
    res.cookie('token', token);
    return res.status(HttpStatus.ACCEPTED).json({ user, token });
  }

  @Get('get/:username')
  @UseGuards(AuthGuard)
  async findAll(@Param('username') username: string, @Req() req: Request) {
    return await this.prismaService.user.findMany({
      where: {
        name: {
          contains: decodeURI(username).toLowerCase(),
          mode: 'insensitive',
        },
      },
    });
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req: Request) {
    return req.body.user;
  }
}
