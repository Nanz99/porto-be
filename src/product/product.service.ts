import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import APIFeatures from 'src/utils/helper';
import { Repository } from 'typeorm';

import { Product } from '../Entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(input: any): Promise<any> {
    const newProduct = await this.productRepository.create(input);
    await this.productRepository.save(newProduct);
    return {
      statusCode: 200,
      message: 'Product created successfully',
      data: null,
    };
  }

  async findAll(query: any): Promise<any> {
    const page = parseInt(query.page, 10) || 1;
    const perPage = parseInt(query.perPage, 10) || 10;
    const skip = (page - 1) * perPage;
    const search = query.search || '';

    const builder = this.productRepository.createQueryBuilder('product');
    const total = await builder
      .where('product.name like :name', { name: '%' + search + '%' })
      .getCount();
    const data = await builder
      .leftJoinAndSelect('product.category', 'category')
      .where('product.name like :name', { name: '%' + search + '%' })
      .orderBy('product.id', 'DESC')
      .skip(skip)
      .take(perPage)
      .getMany();

    return {
      statusCode: 200,
      message: 'Get List Product Successfully',
      data: data,
      pagination: {
        total: total,
        page: page,
      },
    };
  }

  async findById(id: number): Promise<any> {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product Not Found');
    }

    return {
      statusCode: 200,
      message: 'Get Product Details Successfully',
      data: product,
    };
  }

  async update(id: number, product: any): Promise<any> {
    // const updateProduct = await this.productRepository.findOne({
    //   where: { id },
    // });
    // if (!updateProduct) {
    //   throw new NotFoundException('Product Not Found');
    // }
    // await this.productRepository.update(updateProduct, product);

    return {
      statusCode: 200,
      message: 'Product updated successfully',
      data: null,
    };
  }

  async delete(id: number): Promise<any> {
    await this.productRepository.delete(id);
    return {
      statusCode: 200,
      message: 'Product deleted successfully',
      data: null,
    };
  }

  async uploadImages(id, file): Promise<any> {
    const image = await APIFeatures.uploadOneImage(file);

    const product = await this.productRepository.findOne({
      where: { id },
    });

    product.imageUrl = image as string;
    await this.productRepository.save(product);
    return {
      statusCode: 200,
      message: 'Upload file successfully',
      data: product,
    };
  }

  async deleteImages(image) {
    if (!image) return;
    const res = await APIFeatures.deleteImages(image);
    return res;
  }
}
