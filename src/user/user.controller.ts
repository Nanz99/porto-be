import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from 'src/dto/user.dto';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/')
  @ApiBody({ type: UserDto })
  @ApiOperation({ summary: 'Create user' })
  createProduct(
    @Body() data: UserDto,
  ): Promise<any> {
    return this.userService.create(data);
  }

  @Get('/')
  @ApiOperation({ summary: 'Get list user' })
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
    name: 'search',
    required: false,
    type: String,
  })
  getListProducts(
    @Query('page') _page: string,
    @Query('perPage') _perPage: string,
    @Query('search') _search: string,
  ): Promise<any> {
    return this.userService.findAll({
      page: _page,
      perPage: _perPage,
      search: _search,
    });
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get detail user' })
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
  })
  getProductById(
    @Param('id') id: number,
  ): Promise<{ message: string; data: UserDto }> {
    return this.userService.findById(id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update user' })
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
  })
  updateProduct(
    @Param('id') id: number,
    @Body() input: UserDto,
  ): Promise<{ message: string; data: UserDto }> {
    return this.userService.update(id, input);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
  })
  deleteProduct(
    @Param('id') id: number,
  ): Promise<{ message: string; data: null }> {
    return this.userService.delete(id);
  }
}
