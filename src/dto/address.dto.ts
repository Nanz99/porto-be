import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddressDto {
  @ApiProperty({ type: String, description: 'street' })
  @IsString()
  street: string;

  @ApiProperty({ type: String, description: 'ward' })
  @IsString()
  ward: string;

  @ApiProperty({ type: String, description: 'district' })
  @IsString()
  district: string;

  @ApiProperty({ type: String, description: 'city' })
  @IsString()
  city: string;

  @ApiProperty({ type: String, description: 'country' })
  @IsString()
  country: string;

  @ApiProperty({ type: String, description: 'postCode' })
  @IsString()
  postCode: string;
}
