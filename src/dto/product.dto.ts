import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @ApiProperty({ type: String, description: 'name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: 'category' })
  @IsNotEmpty()
  @IsNumber()
  category: number;

  @ApiProperty({ type: String, description: 'imageUrl' })
  @IsString()
  imageUrl: string;

  @ApiProperty({ type: String, description: 'price' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ type: String, description: 'code' })
  @IsString()
  code: string;

  @ApiProperty({ type: String, description: 'sku' })
  @IsString()
  sku: string;

  @ApiProperty({ type: String, description: 'description' })
  @IsString()
  description: string;
}
