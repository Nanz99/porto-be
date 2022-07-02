import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Please enter correct email address.' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
