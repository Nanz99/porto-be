import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email address.' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
