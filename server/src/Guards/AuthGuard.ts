import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const next = context.switchToHttp().getNext();
    try {
      console.log('object');
      const { token } = request.cookies;
      if (!token) {
        throw new UnauthorizedException('token nedded');
      }
      const checkToken = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      if (!checkToken) {
        throw new UnauthorizedException('Invalid token');
      }
      let user: {
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
      };
      user = await this.prismaService.user.findUnique({
        where: {
          id: checkToken.id,
        },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      request.body.user = user;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }

    console.log('object');

    return true;
  }
}
