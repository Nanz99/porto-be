import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleDto } from 'src/dto/role.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { RoleService } from './role.service';

@ApiBearerAuth()
@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

//   @Post('/')
//   @ApiBody({ type: RoleDto })
//   @ApiOperation({ summary: 'Create role' })
//   create(@Body() input: RoleDto): Promise<any> {
//     return this.roleService.create(input);
//   }

  @Get('/')
  //   @UseGuards(AuthGuard(), RolesGuard)
  //   @Roles('admin', 'user')
  @ApiOperation({ summary: 'Get list role' })
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
  findAll(
    @Query('page') _page: string,
    @Query('perPage') _perPage: string,
    @Query('filter') _filter: string,
    @Query('sort') _sort: string,
    @Query('search') _search: string,
  ): Promise<any> {
    return this.roleService.findAll({
      page: _page,
      perPage: _perPage,
      sort: _sort,
      filter: _filter,
      search: _search,
    });
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get detail role' })
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
  })
  findById(
    @Param('id') id: number,
  ): Promise<{ message: string; data: RoleDto }> {
    return this.roleService.findById(id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update role' })
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
  })
  update(
    @Param('id') id: number,
    @Body() input: RoleDto,
  ): Promise<{ message: string; data: RoleDto }> {
    return this.roleService.update(id, input);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete role' })
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
  })
  delete(@Param('id') id: number): Promise<any> {
    return this.roleService.delete(id);
  }
}
