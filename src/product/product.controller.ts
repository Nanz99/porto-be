import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

import { ProductDto } from '../dto/product.dto';
import { ProductService } from './product.service';

@ApiBearerAuth()
@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/')
  @ApiBody({ type: ProductDto })
  @ApiOperation({ summary: 'Create product' })
  @HttpCode(200)
  createProduct(
    @Body() data: ProductDto,
  ): Promise<{ message: string; data: ProductDto }> {
    return this.productService.create(data);
  }

  @Get('/')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Get list product' })
  @ApiQuery({
    name: 'page',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'perPage',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
  })
  getListProducts(
    @Query('page') _page: string,
    @Query('perPage') _perPage: string,
    @Query('filter') _filter: string,
    @Query('sort') _sort: string,
    @Query('search') _search: string,
  ): Promise<{ message: string; data: ProductDto[] }> {
    return this.productService.findAll({
      page: _page,
      perPage: _perPage,
      sort: _sort,
      filter: _filter,
      search: _search,
    });
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get detail product' })
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
  })
  getProductById(
    @Param('id') id: number,
  ): Promise<{ message: string; data: ProductDto }> {
    return this.productService.findById(id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update product' })
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
  })
  updateProduct(
    @Param('id') id: number,
    @Body() input: ProductDto,
  ): Promise<{ message: string; data: ProductDto }> {
    return this.productService.update(id, input);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete product' })
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
  })
  async deleteProduct(
    @Param('id') id: number,
  ): Promise<{ message: string; data: null }> {
    const product = await this.productService.findById(id);
    const isDeleted = await this.productService.deleteImages(product.imageUrl);
    if (!isDeleted) {
      return;
    }
    return this.productService.delete(id);
  }

  @Put('/upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file === undefined) {
      throw new NotFoundException('File Empty');
    }
    return await this.productService.uploadImages(id, file);
  }
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  // }
}
