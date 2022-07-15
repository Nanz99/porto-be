import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/user.dto';
import { Address } from 'src/Entity/address.entity';
import { Role } from 'src/Entity/role.entity';
import { User } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(data: any): Promise<any> {
    {
    }
    const newUser = await this.userRepository.create(data);
    await this.userRepository.save(newUser);
    return {
      message: 'User created successfully',
      data: newUser,
    };
  }

  async findAll(query: any): Promise<{}> {
    const page = parseInt(query.page, 10) || 1;
    const perPage = parseInt(query.perPage, 10) || 10;
    const skip = (page - 1) * perPage;
    const search = query.search || '';

    const builder = this.userRepository.createQueryBuilder('user');
    const total = await builder
      .where('user.name like :name', { name: '%' + search + '%' })
      .getCount();
    const data = await builder
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.address', 'address')
      .where('user.name like :name', { name: '%' + search + '%' })
      .orderBy('user.id', 'ASC')
      .skip(skip)
      .take(perPage)
      .getMany();

    return {
      message: 'Get List User Successfully',
      data: data,
      pagination: {
        total: total,
        page: page,
      },
    };
  }

  async findById(id: number): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return { message: 'Get User Details Successfully', data: user };
  }

  async update(
    id: number,
    product: UserDto,
  ): Promise<{ message: string; data: UserDto }> {
    const updateProduct = await this.userRepository.findOne({
      where: { id },
    });
    if (!updateProduct) {
      throw new NotFoundException('User Not Found');
    }
    await this.userRepository.update(updateProduct, product);

    return { message: 'User updated successfully', data: product };
  }

  async delete(id: number): Promise<{ message: string; data: null }> {
    await this.userRepository.delete(id);
    return { message: 'User deleted successfully', data: null };
  }
}
