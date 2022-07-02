import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/')
  createProduct(
    @Body() data: ProductDto,
  ): Promise<{ message: string; data: ProductDto }> {
    return this.productService.create(data);
  }

  @Get('/')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  getListProducts(@Req() req): Promise<{ message: string; data: ProductDto[] }> {
    console.log(req)
    return this.productService.findAll();
  }

  @Get('/:id')
  getProductById(
    @Param('id') id: string,
  ): Promise<{ message: string; data: ProductDto }> {
    return this.productService.findById(id);
  }

  @Put('/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() input: ProductDto,
  ): Promise<{ message: string; data: ProductDto }> {
    return this.productService.update(id, input);
  }

  @Delete('/:id')
  deleteProduct(
    @Param('id') id: string,
  ): Promise<{ message: string; data: null }> {
    return this.productService.delete(id);
  }
}
