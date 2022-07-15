import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDto } from 'src/dto/role.dto';
import { Role } from 'src/Entity/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async create(data: any): Promise<any> {
    const newRole = await this.roleRepository.create(data);
    await this.roleRepository.save(newRole);
    return {
      message: 'Product created successfully',
      data: newRole,
    };
  }

  async findAll(query: any): Promise<{}> {
    const page = parseInt(query.page, 10) || 1;
    const perPage = parseInt(query.perPage, 10) || 10;
    const skip = (page - 1) * perPage;
    const search = query.search || '';

    const builder = this.roleRepository.createQueryBuilder('role');
    const total = await builder
      .where('role.name like :name', { name: '%' + search + '%' })
      .getCount();
    const data = await builder
      .where('role.name like :name', { name: '%' + search + '%' })
      .orderBy('id', 'DESC')
      .skip(skip)
      .take(perPage)
      .getMany();
    return {
      message: 'Get List Product Successfully',
      data: data,
      pagination: {
        total: total,
        page: page,
      },
    };
  }

  async findById(id: number): Promise<any> {
    const _data = await this.roleRepository.findOne({
      where: { id },
    });
    if (!_data) {
      throw new NotFoundException('Role Not Found');
    }

    return { message: 'Get Role Details Successfully', data: _data };
  }

  async update(
    id: number,
    input: RoleDto,
  ): Promise<{ message: string; data: RoleDto }> {
    const _data = await this.roleRepository.findOne({
      where: { id },
    });
    if (!_data) {
      throw new NotFoundException('User Not Found');
    }
    await this.roleRepository.update(_data, input);

    return { message: 'User updated successfully', data: input };
  }

  async delete(id: number): Promise<{ message: string; data: null }> {
    await this.roleRepository.delete(id);
    return { message: 'User deleted successfully', data: null };
  }
}
