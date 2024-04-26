import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'all fields required' })
  name: string;
  @IsNotEmpty({ message: 'all fields required' })
  @IsEmail()
  email: string;
  @IsNotEmpty({ message: 'all fields required' })
  password: string;
}

export class LoginUserDto {
  @IsNotEmpty({ message: 'all fields required' })
  @IsEmail()
  email: string;
  @IsNotEmpty({ message: 'all fields required' })
  password: string;
}
