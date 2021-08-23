import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductCreatedEventDto } from 'nab-test-common';
import { ProductListDto } from './dto/product.list-dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getProduct(id: number) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Cannot find product with id [${id}]`);
    }
    return product;
  }

  async getProducts(productListDto: ProductListDto) {
    return this.productRepository.getProducts(productListDto);
  }

  async createProduct(product: ProductCreatedEventDto) {
    return this.productRepository.save({ ...product });
  }
}
