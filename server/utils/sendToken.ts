import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

export class SendToken {
  constructor(private readonly jwtService: JwtService) {}

  async sendToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
    });
  }
}
