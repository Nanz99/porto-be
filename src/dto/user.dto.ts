import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AddressDto } from './address.dto';

export class UserDto {
  @ApiProperty({ type: String, description: 'name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: 'email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Please enter correct email address.' })
  email: string;

  @ApiProperty({ type: String, description: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ type: String, description: 'phoneNumber' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ type: AddressDto, description: 'address' })
  address: AddressDto;

  @ApiProperty({ type: Number, description: 'roleId' })
  roleId: number;
}
