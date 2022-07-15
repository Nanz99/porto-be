import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    description: 'email',
    default: 'admin@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email address.' })
  email: string;

  @ApiProperty({ type: String, description: 'password', default: '123456' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
