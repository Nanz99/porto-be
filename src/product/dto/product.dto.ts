import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class ProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  imageUrl: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  code: string;

  @IsString()
  sku: string;

  @IsString()
  description: string;
}