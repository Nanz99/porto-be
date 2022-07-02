import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(
    data: ProductDto,
  ): Promise<{ message: string; data: ProductDto }> {
    const newProduct = await this.productRepository.create(data);
    await this.productRepository.save(newProduct);
    return {
      message: 'Product created successfully',
      data: newProduct,
    };
  }

  async findAll(): Promise<{ message: string; data: ProductDto[] }> {
    const listProduct = await this.productRepository.find({});
    return {
      message: 'Get List Product Successfully',
      data: listProduct,
    };
  }

  async findById(id: string): Promise<{ message: string; data: ProductDto }> {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product Not Found');
    }

    return { message: 'Get Product Details Successfully', data: product };
  }

  async update(
    id: string,
    product: ProductDto,
  ): Promise<{ message: string; data: ProductDto }> {
    const updateProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (!updateProduct) {
      throw new NotFoundException('Product Not Found');
    }
    await this.productRepository.update(updateProduct, product);

    return { message: 'Product updated successfully', data: product };
  }

  async delete(id: string): Promise<{ message: string; data: null }> {
    await this.productRepository.delete(id);
    return { message: 'Product deleted successfully', data: null };
  }
}
